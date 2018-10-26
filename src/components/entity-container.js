import React, { Component } from 'react';
import { connect } from "react-redux";
import { Table, Modal, Tooltip, Popconfirm, Icon, Button    } from 'antd';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/monokai';
import { 
    dynamicEntityGet,
    dynamicEntityByIdDelete 
} from '../store/actions/Entity';

class EntityContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { objectSelect: '' };
        this.onDelete = this.onDelete.bind(this);
    }

    componentDidMount(){
        this.props.actiondynamicEntityGet();
    }

    onDelete(id){
        this.props.actiondynamicEntityByIdDelete(id).then( () => {
            this.props.actiondynamicEntityGet();
        });
    }

    onOpen(entity){
        this.setState({ objectSelect:entity,entityOpen: true });
    }

    handleClose = (e) => {
        console.log(e);
        this.setState({
            entityOpen: false,
        });
    }
    

    render() { 
        const columns = [{
            title: 'Entities',
            dataIndex: 'name',
            key: 'name',
            render: (text, record) => (
                <label>{text}</label>
            ),
          }, {
            key: 'action',
            render: (text, record) => (
                <div>
                    <Tooltip title="Delete Entity">
                        <Popconfirm title="Delete Entity?" placement="left" onConfirm={() => this.onDelete(record.id)} okText="Yes" cancelText="No">
                            <Icon style={styleIcons} type="delete" className="pointer" />
                        </Popconfirm>
                    </Tooltip>                       
                    <Tooltip title="View Entity">
                        <Icon style={styleIcons} type="info-circle" className="pointer" onClick={ () => this.onOpen(record) } />
                    </Tooltip>  
                </div>
            ),
          }];

        return ( 
            <div style={{paddingTop: 10}}>
                <div className="col-md-offset-3 col-md-6 col-sm-12">

                 <Table
                    size='middle'
                    style={{ height: 200 }}
                    rowKey={record => record.id}
                    loading={this.props.isFetchingEntitiesGet}
                    columns={columns}
                    showHeader={true}
                    pagination={{ position: 'top' }}
                    dataSource={this.props.listEntities}/>
                <Modal
                    title="Entity Info"
                    closable={false}
                    visible={this.state.entityOpen}
                    onOk={this.handleClose}
                    onCancel={this.handleClose}
                    footer={[
                      <Button key="submit" type="primary" onClick={this.handleClose}>
                        Close
                      </Button>,
                    ]}
                    >
                    <AceEditor
                        style={{height: 350, width: 'auto'}}
                        mode="json"
                        theme="monokai"
                        name="blah2"
                        onLoad={this.onLoad}
                        onChange={this.onChange}
                        fontSize={14}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={JSON.stringify(this.state.objectSelect, null, "\t")}
                        setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                        }}/>
                </Modal>
                </div>
            </div> 
            )
    }
}

const styleIcons = {
    cursor: 'pointer',
    fontSize: 32,
    padding: 10,
    float: "right"
}

const mapStateToProps = state => ({
    isFetchingEntitiesGet: state.entity.isFetchingEntitiesGet,
    listEntities: state.entity.listEntities,
});
  
const mapDispatchToProps = dispatch => ({
    actiondynamicEntityGet:() => dispatch(dynamicEntityGet()),
    actiondynamicEntityByIdDelete: id => dispatch(dynamicEntityByIdDelete(id)),
});
  
 export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EntityContainer);