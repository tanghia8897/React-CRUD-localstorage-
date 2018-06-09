import * as types from './../constants/actionTypes';
const uuidv1 = require('uuid/v1');

var data = JSON.parse(localStorage.getItem('tasks'));
var inititalState = data ? data : [];// nó là 1 arr vì trong app thằng tasks cũng là 1 arr

var findIndex = (tasks,id)=>{
    var result = -1;
    tasks.forEach((task,index)=>{
        if(task.id === id){
          result = index;
        }
    })
    return result;
  }

var myReducer = (state = inititalState,action) =>{
    var id = '';
    var index = -1;
    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.ADD_OR_EDIT_TASK:
            var newTask = {
                id : action.task.id,
                name : action.task.name, //bên action trả về biến task
                status : action.task.status === 'true' ? true : false
            }
            if(!newTask.id){
                newTask.id = uuidv1();
                state.push(newTask);
            }else{
                index = findIndex(state,newTask.id);
                state[index] = newTask; 
            }
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK: 
            id = action.id //bên action trả về biến id
            index = findIndex(state,id) 
            state[index]={
                ...state[index],
                status : !state[index].status
            }
            localStorage.setItem('tasks',JSON.stringify(state)); 
            return [...state] 
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state,id);
            state.splice(index,1);
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state]
       
        default : return state;
    }
    // return state;
};

export default myReducer;