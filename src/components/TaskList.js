import React, { Component } from 'react';
import TaskItem from './TaskItem';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName:'',
            filterStatus:-1
        }
    }
    onChange = (event)=>{
        var name = event.target.name;
        var value= event.target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        )
        this.setState({
            [name]:value
        })
    }
    
    render() {
        var {tasks}=this.props
        var elmsTasks = tasks.map((task,index)=>{
            return <TaskItem 
                    key={task.id}
                    index={index}
                    task={task}
                    onUpdateStatus={this.props.onUpdateStatus}
                    onDelete = {this.props.onDelete}
                    onUpdate={this.props.onUpdate}
                    />
        })
        return (
            <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input type="text" 
                         className="form-control" 
                         name="filterName"
                         value={this.state.filterName}
                         onChange={this.onChange}
                         />
                    </td>
                    <td>
                        <select className="form-control"
                         value={this.state.filterStatus}
                         onChange={this.onChange}
                         name="filterStatus"
                        >
                            <option value="-1">Tất Cả</option>
                            <option value="0">Ẩn</option>
                            <option value="1">Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                {elmsTasks}
            </tbody>
        </table>
        );
    }
}

export default TaskList;