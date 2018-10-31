import React, { Component } from 'react';
import { Menu, Icon, Avatar, Layout } from 'antd';
import EntityContainer from './entity-container';
import SwaggerDoc from './swagger-docs';
import DataTypeContainer from './datatype-container';
import CodegenContainer from './codegen-container';
import Home from './home';
import Footer from './footer';
import Header from './header';

const {  Sider, Content } = Layout;

class TabMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {  collapsed: false, isMobile: false, current: 'home' }
        this.getLogo = this.getLogo.bind(this);
        this.shouldHideLogo = this.shouldHideLogo.bind(this);
    }

    onResize() {
        if(window.innerWidth < 500) {
          this.setState({ isMobile: true });
        } else {
            this.setState({ isMobile: false });
        }
      }

    componentDidMount(){
        window.addEventListener("resize", this.onResize.bind(this));
    }

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    }

    handleClick = (e) => {
        this.setState({current: e.key});
    }

    getContent(){
        switch(this.state.current){
            case "home":
                return <Home/>;
            case "entities":
                return <EntityContainer/>;
            case "datatypes":
                return <DataTypeContainer/>;                
            case "swagger":
                return <SwaggerDoc/>;
            case "codegen":
                return <CodegenContainer/>;                
            default:
                return <div/>;
        }
    }

    getLogo(){
        if(this.shouldHideLogo())
            return <Avatar shape="logo-avatar" size={48} src="./images/icons/icon-96x96.png" shape="square"/>;
        else
            return <h1><Avatar shape="logo-avatar" size={48} src="./images/icons/icon-96x96.png" shape="square"/> DyRA</h1>;
    }

    shouldHideLogo(){
        return this.state.isMobile || this.state.collapsed;
    }

    render() { 
        const contentStyle = {
            margin: '24px 16px', background: '#fff' 
        }
        return  (
            <div>
                <Layout style={ layoutStyle }>
                    <Sider 
                        className="menu-sider"
                        collapsible={ !this.state.isMobile }
                        collapsed={ this.state.isMobile ? true : this.state.collapsed}
                        onCollapse={this.toggle}
                    >
                    <div className="logo menu-sider" >
                        { this.getLogo()}
                    </div>
                    <Menu  className={ this.shouldHideLogo() ? "menu-sider-collapsed" : "menu-sider"} theme="dark" mode="inline" defaultSelectedKeys={['home']} onClick={this.handleClick}>
                        <Menu.Item key="home">
                            <Icon type="home" />
                            <span>Home</span>
                        </Menu.Item>
                        <Menu.Item key="entities">
                            <Icon type="table" />
                            <span>Entities</span>
                        </Menu.Item>
                        <Menu.Item key="datatypes">
                            <Icon type="appstore" />
                            <span>DataTypes</span>
                        </Menu.Item> 
                        <Menu.Item key="swagger">
                            <Icon type="file-text" />
                            <span>Swagger</span>
                        </Menu.Item>     
                        <Menu.Item key="codegen">
                            <Icon type="code" />
                            <span>Codegen</span>
                        </Menu.Item>                                            
                    </Menu>
                    </Sider>
                    <Layout>
                        <Header/>
                        <Content style={ contentStyle } className="padding">
                            <div>
                                <div>
                                    {this.getContent()}
                                </div>
                            </div>
                        </Content>
                        <Footer/>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

const layoutStyle = {
    top:'0', bottom:'0', left:'0', right:'0', position: 'absolute'
}

 
export default TabMenu;