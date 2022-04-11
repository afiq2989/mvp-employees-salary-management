import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input, Icon } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { addEmployees } from '../../../actions/employees';
import { toast } from 'react-toastify';

const UploadModal = ({open, openModal, closeModal}) => {
    const [file, setFile] = useState({});
    const dispatch = useDispatch()

    const handleOnCancel = () => closeModal();
    const handleOnSave = () => {
        const formData = new FormData()
        formData.append('file', file); 
        dispatch(addEmployees(formData));
        closeModal();
        toast.success("Record created successfully", { theme:"colored" });
    }
    const handleInputChange = (event) => {
        event.preventDefault();
        
        if (event.target.files.length) {
            let fileInput = event.target.files[0];
            console.log('fileInput', fileInput)
      
            if (fileInput.type === 'text/csv') {
                if (fileInput.size > 2e6) {
                    toast.error('Uploaded file is to big. File must be less than 2MB', { theme: 'colored'})
                    return;
                }
                setFile(fileInput);
            } else {
                toast.error('Invalid file. Please upload a valid csv file.', { theme: 'colored'})
                return;
            }
        }
    }

    return (
        <>
        <Modal
            size={'tiny'}
            className='Modal EditModal'
            open={open}
            trigger={<Button animated floated='right' onClick={() => openModal()}>
                        <Button.Content visible>Add Users</Button.Content>
                        <Button.Content hidden>
                            <Icon name='plus' /> Upload CSV
                        </Button.Content>
                    </Button>}
        >
        <Modal.Header>Add new users</Modal.Header>
        <Modal.Content>
            <Input 
                placeholder="Upload a csv file"
                name="file"
                type='file'
                accept=".csv"
                onChange={handleInputChange}
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
        </>
    )
}

UploadModal.propTypes = {}

export default UploadModal