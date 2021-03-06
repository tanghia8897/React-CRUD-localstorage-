//trả ra type để reducer phân tích
import * as types from './../constants/actionTypes';

export const listAll = ()=>{
    return {
        type : types.LIST_ALL
    }
};
export const addOrEditTask = (task)=>{
    return {
        type : types.ADD_OR_EDIT_TASK,
        task : task
    }
};
export const toggleForm = ()=>{
    return {
        type : types.TOGGLE_FORM,
    }
};
export const openForm = ()=>{
    return {
        type : types.OPEN_FORM,
    }
};
export const closeForm = ()=>{
    return {
        type : types.CLOSE_FORM,
    }
};
export const updateStatus = (id)=>{
    return {
        type : types.UPDATE_STATUS_TASK,
        id : id
    }
};
export const onDelete = (id)=>{
    return {
        type : types.DELETE_TASK,
        id : id
    }
};
export const onUpdate = (task)=>{
    return {
        type : types.EDIT_TASK,
        task : task
    }
};