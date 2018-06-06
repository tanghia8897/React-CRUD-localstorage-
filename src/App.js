import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import _ from 'lodash';
import './App.css';

const uuidv1 = require('uuid/v1');


class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        tasks:[],
        isDisplayForm:false,
        taskEditing:null,
        filter : {
          name:'',
          status:-1
        },
        keyword : '',
      }
  }
  onClickSearch = (keyword)=>{
      this.setState({
        keyword:keyword
      })
  }
  onFilter = (filterName,filterStatus)=>{
      filterStatus = parseInt(filterStatus,10);
      this.setState({
        filter : {
          name : filterName.toLowerCase(),
          status : filterStatus
        }
        
      })
  }

  onOpenForm = ()=>{
    this.setState({
      isDisplayForm:true
    })
  }
  onUpdate =(id)=>{
    var {tasks}=this.state;
    // var index = this.findIndex(id);
    var index = _.findIndex(tasks,(task)=>{
      return task.id === id;
    })
    this.setState({
      taskEditing:tasks[index]
    })
    this.onOpenForm()
  }
  onDelete = (id)=>{
    var {tasks} = this.state;
      // var index = this.findIndex(id);
      var index = _.findIndex(tasks,(task)=>{
        return task.id === id;
      })

      if(index !== -1){
        tasks.splice(index,1);
        this.setState({
          tasks:tasks
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));
      }
  }
  onUpdateStatus = (id)=>{
      var {tasks} = this.state;
      // var index = this.findIndex(id);
      var index = _.findIndex(tasks,(task)=>{
        return task.id === id;
      })

      if(index !== -1){
        tasks[index].status = !tasks[index].status;
        this.setState({
          tasks:tasks
        })
        localStorage.setItem('tasks',JSON.stringify(tasks));
      }
      
  }
  // findIndex = (id)=>{
  //   var {tasks}=this.state;
  //   var result = -1;
  //   tasks.forEach((task,index)=>{
  //       if(task.id === id){
  //         result = index;
  //       }
  //   })
  //   return result;
  // }
  onSubmitForm = (data)=>{
    console.log(data);
    var {tasks} = this.state;
    if(data.id === ''){
      data.id = uuidv1();
      tasks.push(data);
    }else{
      // var index = this.findIndex(data.id);
      var index = _.findIndex(tasks,(task)=>{
        return task.id === data.id;
      })
      tasks[index]=data
    }
    this.setState({
      tasks:tasks, 
      taskEditing:null,   
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
      
  }
  onDisplayForm = ()=>{
    this.setState({
      isDisplayForm:!this.state.isDisplayForm,
      taskEditing:null
    })
  }
  componentWillMount(){ //hàm này chạy đầu tiên và gán dữ liệu trên localStorage vào state
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks:tasks
      })
    }
  }

  
  
  render() {
    var {  filter , tasks , keyword } = this.state;
    if(filter){
      if(filter.name){
           this.state.tasks = _.filter(tasks,(task)=>{
              return task.name.toLowerCase().indexOf(filter.name) !== -1;
           })
          // this.state.tasks = this.state.tasks.filter((task)=>{
          //   return task.name.toLowerCase().indexOf(filter.name);
          // })
      }
      this.state.tasks = _.filter(this.state.tasks,(task)=>{
        if(filter.status === -1){
          return task;
        }else{
          return task.status === (filter.status === 1 ? true : false)
        }
     })
    }

    if(keyword){
      this.state.tasks = _.filter(this.state.tasks,(task)=>{
        return task.name.toLowerCase().indexOf(keyword.toLocaleLowerCase()) !== -1;
      })
    }

    var elmTaskForm =(this.state.isDisplayForm) ? <TaskForm 
        onDisplayForm={this.onDisplayForm}
        onSubmitForm={this.onSubmitForm}
        task={this.state.taskEditing}
        /> : '';

    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                {elmTaskForm}
            </div>
            <div className={(this.state.isDisplayForm===true)?"col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-12"}>
            
                {this.state.isDisplayForm===false? <button type="button" className="btn btn-primary pd" onClick={this.onDisplayForm}>
                    <span className="fa fa-plus mr-5 "></span>Thêm Công Việc
                </button> : <button type="button" className="btn btn-danger pd " onClick={this.onDisplayForm}>
                    <span className="fa fa-plus mr-5 "></span>Hủy
                </button>}
               
                <Control
                onClickSearch={this.onClickSearch}
                />
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList tasks={this.state.tasks}
                        onUpdateStatus = {this.onUpdateStatus}
                        onDelete = {this.onDelete}
                        onUpdate={this.onUpdate}
                        onFilter = {this.onFilter}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}

export default App;
