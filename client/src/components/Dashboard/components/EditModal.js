import React, { useEffect, useState, memo } from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Modal, Button, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { getEmployee, updateEmployee } from '../../../actions/employees';
import { useDispatch, useSelector } from 'react-redux';

import './Modal.scss';

const EditModal = memo(({empId, open, openEditModal, closeEditModal}) => {
    const [state, setState] = useState({
        id: '',
        employee_name: '',
        employee_login: '',
        employee_salary: ''
    })
    const { employee } = useSelector(state => state.employees);
    const dispatch = useDispatch();

    const handleOnCancel = () => closeEditModal();

    const handleOnSave = () => {
        const { id, employee_name, employee_salary, employee_login } = state;

        const params = {
            id: id,
            employee_name: employee_name,
            employee_login: employee_login,
            employee_salary: employee_salary
        }
        dispatch(updateEmployee(params));
        closeEditModal();
        toast.success("Record updated successfully", { theme:"colored" });
    }

    const handleInputChange = (e) => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (employee) setState(employee)
    }, [employee])

    useEffect(() => {
        if (open) {
            dispatch(getEmployee(empId))
        }
    }, [open])

    const { id, employee_name, employee_salary, employee_login } = state;
    return (
        <Modal
            size={'tiny'}
            className='Modal EditModal'
            open={open}
            trigger={<Button
                circular
                icon='pencil alternate'
                onClick={() => openEditModal(empId)}
        />}
        >
        <Modal.Header>Edit</Modal.Header>
        <Modal.Content>
            <Input
                name="id"
                type='text'
                value={id || ''}
                label="Employee Id"
                labelPosition='left'
                disabled
            />
            <Input 
                placeholder="Name"
                name="employee_name"
                type='text'
                value={employee_name || ''}
                onChange={handleInputChange}
                label="Name"
                labelPosition='left'
            />
            <br />
            <Input
                placeholder="Login"
                name="employee_login"
                type='text'
                value={employee_login || ''}
                onChange={handleInputChange}
                label="Login"
                labelPosition='left'
            />
            <br />
            <Input
                placeholder="Salary"
                name="employee_salary"
                type='number'
                value={employee_salary || ''}
                onChange={handleInputChange}
                label="Salary"
                labelPosition='left'
            />
        </Modal.Content>
        <Modal.Actions>
            <Button 
                onClick={handleOnCancel}
            >
                Cancel
            </Button>
            <Button
            onClick={handleOnSave}
            >
                Save
            </Button>
        </Modal.Actions>
        </Modal>
    )
})

EditModal.defaultProps = {
    open: false
};

EditModal.propTypes = {
    empId: PropTypes.number,
    open: PropTypes.bool,
    openEditModal: PropTypes.func,
    closeEditModal: PropTypes.func
};


export default EditModal