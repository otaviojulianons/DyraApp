import React, { Component } from 'react';
import { Menu, Icon, Avatar, Layout } from 'antd';
import EntityContainer from './entity-container';
import SwaggerDoc from './swagger-docs';
import DataTypeContainer from './datatype-container';
import CodegenContainer from './codegen-container';
// import {isMobile} from 'react-device-detect';

const { Header, Sider, Content } = Layout;

class TabMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {  collapsed: false, isMobile: false, current: 'entities' }
    }

    onResize() {
        if(window.innerWidth < 500) {
          this.setState({ isMobile: true });
        } else {
            this.setState({ isMobile: false });
        }
        console.log(window.innerWidth);
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
        console.log('click ', e);
        this.setState({
          current: e.key,
        });
    }

    getContent(){
        switch(this.state.current){
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
                        <Avatar shape="logo-avatar" size={48} src="./images/icons/icon-96x96.png" shape="square"/>
                    </div>
                    <Menu  className="menu-sider" theme="dark" mode="inline" defaultSelectedKeys={['entities']} onClick={this.handleClick}>
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
                        <Header>
                            <h1>DyRA</h1>
                            <h4>Dynamic Rest API</h4>
                        </Header>
                        <Content style={ contentStyle } className="padding">
                            <div>
                                <div>
                                    {this.getContent()}
                                </div>
                            </div>
                        </Content>
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