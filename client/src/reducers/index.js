import employeesReducer from "./employees";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    employees: employeesReducer
});
  
export default rootReducer;