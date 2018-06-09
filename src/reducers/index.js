import { combineReducers } from 'redux'; //reducer nơi import các reducer và conbine các reducer khác
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditting from './itemEditting';

const myReducer = combineReducers ({
    tasks:tasks,
    isDisplayForm: isDisplayForm,
    itemEditting : itemEditting,
});

export default myReducer;