import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { deleteEmployee } from '../../../actions/employees';
import { useDispatch } from 'react-redux';

const DeleteModal = memo(({id, open, openDeleteModal, closeDeleteModal}) => {
    const dispatch = useDispatch();

    const handleOnCancel = () => closeDeleteModal();

    const handleOnConfirm = () => {
        dispatch(deleteEmployee(id))
        closeDeleteModal();
        toast.success("Record deleted successfully", { theme:"colored" });
    }

    return (
            <Modal
                size={'tiny'}
                className='Modal DeleteModal'
                open={open}
                trigger={<Button
                    circular
                    icon='trash alternate outline'
                    onClick={() => openDeleteModal(id)}
            />}
            >
            <Modal.Header>Delete</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete this employee details (Employee Id: {id})?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button 
                    onClick={handleOnCancel}
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleOnConfirm}
                >
                    Yes
                </Button>
            </Modal.Actions>
        </Modal>
    )
})

DeleteModal.defaultProps = {
    id: '',
    open: false
};

DeleteModal.propTypes = {
    id: PropTypes.number,
    open: PropTypes.bool,
    openDeleteModal: PropTypes.func,
    closeDeleteModal: PropTypes.func
}

export default DeleteModal