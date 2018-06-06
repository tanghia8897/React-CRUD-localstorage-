import React, { Component } from 'react';

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
        if(this.props.task){
            this.setState({
                id:this.props.task.id,
                name:this.props.task.name,
                status:this.props.task.status
            })
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id:nextProps.task.id,
                name:nextProps.task.name,
                status:nextProps.task.status
            })
        }
    }
    onClear = ()=>{
        this.setState({
            name:'',
            status:false
        })
        console.log(this.state)
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
        this.props.onSubmitForm(this.state);
        this.onClear();
        this.props.onDisplayForm();
    }
    
    render() {
        
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

export default TaskForm;