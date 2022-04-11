import axios from 'axios';

export const GET_ALL_EMPLOYEES = 'GET_ALL_EMPLOYEES';
export const GET_FILTERED_EMPLOYEES = 'GET_FILTERED_EMPLOYEES';
export const GET_EMPLOYEE = 'GET_EMPLOYEE';
export const ADD_EMPLOYEES = 'ADD_EMPLOYEES';
export const UPDATE_EMPLOYEE= 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const EMPLOYEES_ERROR = 'GET_ALL_EMPLOYEES_ERROR';
export const CHANGE_SORT = 'CHANGE_SORT';
export const CHANGE_PAGINATION = 'CHANGE_PAGINATION';

export const getAllEmployees = (pagination = { page: 1, pageSize:10 }) => async dispatch => {
    try {
        const response = await axios({
            baseURL: 'http://localhost:3000/api',
            url: '/employees',
            method: 'GET',
            params: pagination
        })

        dispatch( {
            type: GET_ALL_EMPLOYEES,
            payload: response.data,
            pagination: pagination
        })
    }
    catch(e){
        dispatch( {
            type: EMPLOYEES_ERROR,
            payload: 'Error in getting all employees',
        })
    }
};

export const getfilteredEmployees = (pagination = { page: 1, pageSize:10 }, filter = { min: 0, max: 0 }) => async dispatch => {
    try {
        const response = await axios({
            baseURL: 'http://localhost:3000/api',
            url: '/employees/filter',
            method: 'GET',
            params: {
                ...pagination,
                max: filter.max,
                min: filter.min
            }
        })

        dispatch( {
            type: GET_FILTERED_EMPLOYEES,
            payload: response.data,
            min: filter.min,
            max: filter.max
        })
    }
    catch(e){
        dispatch( {
            type: EMPLOYEES_ERROR,
            payload: 'Error in getting all employees',
        })
    }
};

export const getEmployee = (id) => async dispatch => {
    try {
        const response = await axios({
            baseURL: 'http://localhost:3000/api',
            url: `/employees/${id}`,
            method: 'GET'
        })

        dispatch( {
            type: GET_EMPLOYEE,
            payload: response.data
        })
    }
    catch(e){
        dispatch( {
            type: EMPLOYEES_ERROR,
            payload: `Error in getting employee id ${id}`,
        })
    }
};

export const updateEmployee = (params) => async dispatch => {
    try {
        const response = await axios({
            baseURL: 'http://localhost:3000/api',
            url: `/employees/${params.id}`,
            method: 'PUT',
            data: params
        })

        dispatch( {
            type: UPDATE_EMPLOYEE,
            payload: response.data
        })
    }
    catch(e){
        dispatch( {
            type: EMPLOYEES_ERROR,
            payload: `Error in updating employee id ${id}`,
        })
    }
};

export const deleteEmployee = (id) => async dispatch => {
    try {
        const response = await axios({
            baseURL: 'http://localhost:3000/api',
            url: `/employees/${id}`,
            method: 'DELETE'
        })

        dispatch( {
            type: DELETE_EMPLOYEE,
            payload: response.data
        })
    }
    catch(e){
        dispatch( {
            type: EMPLOYEES_ERROR,
            payload: `Error in deleting employee id ${id}`,
        })
    }
};

export const addEmployees = (formData) => async dispatch => {
    try {
        const response = await axios({
            baseURL: 'http://localhost:3000/api',
            url: '/employees',
            method: 'POST',
            data: formData
        })
        dispatch ({
            type: ADD_EMPLOYEES
        })
    }
    catch(e){
        dispatch( {
            type: EMPLOYEES_ERROR,
            payload: 'Error in adding employees',
        })
    }
};

export const changeSort = (column) => {
    return {
        type: CHANGE_SORT,
        column: column
    };
}

export const changePagination = ({page, pageSize}) => {
    return {
        type: CHANGE_PAGINATION,
        page: page,
        pageSize: pageSize
    }
}
