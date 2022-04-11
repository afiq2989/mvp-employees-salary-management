import _, { filter } from 'lodash';

import { 
    GET_ALL_EMPLOYEES,
    EMPLOYEES_ERROR,
    GET_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE,
    CHANGE_SORT,
    CHANGE_PAGINATION,
    GET_FILTERED_EMPLOYEES,
    ADD_EMPLOYEES
} from '../actions/employees';

const initialState = {
    employees: [],
    employee: {
        id: '',
        name: '',
        login: '',
        salary: ''
    },
    tableSort: {
        column: '',
        data: [],
        direction: 'ascending'
    },
    employeesError: '',
    pagination:{
        page: 1,
        pageSize: 10
    },
    filter: {
        min: 0,
        max: 0
    },
    count: 0,
    render: true
};

const employeesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_EMPLOYEES: 
            return {
                ...state,
                employees: action.payload.employees,
                count: action.payload.count,
                tableSort: {
                    ...state.tableSort,
                    data: action.payload.employees
                },
                pagination: {
                    page: action.pagination.page,
                    pageSize: action.pagination.pageSize
                },
                filter: {
                    min: 0,
                    max: 0
                },
                render: false
            }
        case GET_FILTERED_EMPLOYEES:
            return {
                ...state,
                employees: action.payload.employees,
                count: action.payload.count,
                tableSort: {
                    ...state.tableSort,
                    data: action.payload.employees
                },
                filter: {
                    min: action.min,
                    max: action.max
                },
                render: false,
            }
        case GET_EMPLOYEE:
        case UPDATE_EMPLOYEE:
            return {
                ...state,
                employee: action.payload,
                render: true
            }
        case ADD_EMPLOYEES:
            return {
                ...state,
                render: true
            }
        case DELETE_EMPLOYEE:
            return {
                ...state,
                employee: initialState.employee,
                render: true
            }
        case EMPLOYEES_ERROR:
            return {
                ...state,
                employeesError: action.payload
            }
        case CHANGE_SORT:
            if (state.tableSort.column === action.column) {
                return {
                    ...state,
                    tableSort: {
                        ...state.tableSort,
                        data: state.tableSort.data.slice().reverse(),
                        direction: state.tableSort.direction === 'ascending' ? 'descending' : 'ascending',
                    }
                }
                
            } else {
                return {
                    ...state,
                    tableSort: {
                        column: action.column,
                        data: _.sortBy(state.employees, [action.column]),
                        direction: 'ascending',
                    }
                }
            }
        case CHANGE_PAGINATION:
            return {
                ...state,
                pagination: {
                    page: action.page,
                    pageSize: action.pageSize
                }
            }
        default:
            return state;
    }
}

export default employeesReducer;