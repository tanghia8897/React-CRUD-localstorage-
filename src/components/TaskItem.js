import React, { Component } from 'react';
import  {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskItem extends Component {
    onUpdateTask=()=>{
        // this.props.onUpdateTask(this.props.task.id);
        this.props.onOpenForm();
        this.props.onUpdateTask(this.props.task);
    }
    onDelete = ()=>{
        this.props.onDeleteTask(this.props.task.id);
    }
    onUpdateStatus = ()=>{
        this.props.onUpdateStatus(this.props.task.id);
       
    }
    render() {
        return (
            <tr>
                <td>{this.props.index + 1}</td>
                <td>{this.props.task.name}</td>
                <td className="text-center">
                    <span 
                        onClick={this.onUpdateStatus}
                        className={(this.props.task.status === true) ? "label label-success" : "label label-danger" }>
                                    {(this.props.task.status===true)? "Kích Hoạt" : "Ẩn"}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdateTask}>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={this.onDelete} >
                        <span  className="fa fa-trash mr-5"  ></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}
const mapStateToProps = state =>{
    return {
      
    }
  }
  const mapDispatchToProps = (dispatch,props)=>{
    return {
        onUpdateStatus : (id)=>{
          dispatch(actions.updateStatus(id));
        },
        onDeleteTask :(id)=>{
            dispatch(actions.onDelete(id))
        },
        onUpdateTask :(task)=>{
            dispatch(actions.onUpdate(task))
        },
        onOpenForm : ()=>{
            dispatch(actions.openForm());
        }
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);
