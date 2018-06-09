import * as types from './../constants/actionTypes';

var inititalState = {
    id:'',
    name:'',
    status:false
};
var myReducer = (state = inititalState,action) =>{
    switch(action.type){
        case types.EDIT_TASK:
            return action.task;
        default : return state;
    }
    
    // return state;
};

export default myReducer;