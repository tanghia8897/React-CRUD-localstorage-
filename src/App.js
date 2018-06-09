import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
// import _ from 'lodash';
import './App.css';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = { 
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
  onDisplayForm = ()=>{
    this.props.onToggleForm();
  }

  render() {
    // var {  filter ,
      //  tasks ,
      //  keyword } = this.state;
    // if(filter){
    //   if(filter.name){
    //        this.state.tasks = _.filter(tasks,(task)=>{
    //           return task.name.toLowerCase().indexOf(filter.name) !== -1;
    //        })
    //       // this.state.tasks = this.state.tasks.filter((task)=>{
    //       //   return task.name.toLowerCase().indexOf(filter.name);
    //       // })
    //   }
    //   this.state.tasks = _.filter(this.state.tasks,(task)=>{
    //     if(filter.status === -1){
    //       return task;
    //     }else{
    //       return task.status === (filter.status === 1 ? true : false)
    //     }
    //  })
    // }

    // if(keyword){
    //   this.state.tasks = _.filter(this.state.tasks,(task)=>{
    //     return task.name.toLowerCase().indexOf(keyword.toLocaleLowerCase()) !== -1;
    //   })
    // }
    var { isDisplayForm } = this.props;
    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <TaskForm />
            </div>
            <div className={(isDisplayForm===true)?"col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-12"}>
                {isDisplayForm===false? <button type="button" className="btn btn-primary pd" onClick={this.onDisplayForm}>
                    <span className="fa fa-plus mr-5 "></span>Thêm Công Việc
                </button> : <button type="button" className="btn btn-danger pd " onClick={this.onDisplayForm}>
                    <span className="fa fa-plus mr-5 "></span>Hủy
                </button>}
               
                <Control
                    onClickSearch={this.onClickSearch}
                />
                <div className="row mt-15">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList onFilter = {this.onFilter}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
  }
}
const mapStateToProps = state =>{
  return {
    isDisplayForm : state.isDisplayForm,
    itemEditting : state.itemEditting
  }
}
const mapDispatchToProps = (dispatch,props)=>{
  return {
      onToggleForm : ()=>{
        dispatch(actions.toggleForm());
      },
      onOpenForm : ()=>{
        dispatch(actions.openForm());
      }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);

