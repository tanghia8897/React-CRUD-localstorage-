import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name:'',
            status:true
        }
    }
    componentWillMount(){
        if(this.props.itemEditting && this.props.itemEditting.id !== null){
            this.setState({
                id:this.props.itemEditting.id,
                name:this.props.itemEditting.name,
                status:this.props.itemEditting.status
            })
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditting.id !== null){
            this.setState({
                id:nextProps.itemEditting.id,
                name:nextProps.itemEditting.name,
                status:nextProps.itemEditting.status
            })
        }
    }
    onClear = ()=>{
        this.setState({
            id:'',
            name:'',
            status:false
        })
    }
    onchange = (event)=>{
        var name = event.target.name;
        var value = event.target.value;
        if(name === 'status'){
            value = event.target.value === 'true' ? true : false
        }
        this.setState({
            [name]:value
        }) 
    }
    onsubmit = (event)=>{
        event.preventDefault();
        // this.props.onSubmitForm(this.state);
        this.props.onAddOrEditTask(this.state);
        // this.onClear();
        // this.props.onDisplayForm();
        this.props.onCloseForm();
    }
    
    render() {
        if(!this.props.isDisplayForm) return '';
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.state.id !== ''? 'Cập nhật cộng việc' : 'Thêm Công Việc'}</h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onsubmit} >
                        <div className="form-group" >
                            <label>Tên :</label>
                            <input type="text" value={this.state.name} name="name" onChange={this.onchange} className="form-control" />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control"  value={this.state.status} name="status" onChange={this.onchange} required="required">
                            <option value="true">Kích Hoạt</option>
                            <option value="false">Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            {this.state.id !== ''?
                             <button type="submit" className="btn btn-warning" >Cập nhật</button> 
                             : <button type="submit" className="btn btn-warning" >Thêm</button>}

                            <button type="reset" className="btn btn-danger" onClick={this.onClear} >Hủy bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapToProps = state =>{
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditting : state.itemEditting, // khi click vào nút edit thì trạng thái bên reducer là 1 task đầy đủ thông tin
    }
}
const mapDispatchToProps = (dispatch,props)=>{
    return {
        onAddOrEditTask : (task)=>{
            dispatch(actions.addOrEditTask(task));
        },
        onCloseForm : ()=>{
            dispatch(actions.closeForm());
        }
    }
}
export default connect(mapToProps,mapDispatchToProps)(TaskForm);