import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Container, Table, Header } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import ScrollArea from 'react-scrollbar';

import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';
import UploadModal from './components/UploadModal';
import SalaryFilter from './components/SalaryFilter';
import Pagination from '../Pagination';

import { 
    getAllEmployees,
    changeSort,
    changePagination,
    getfilteredEmployees
} from '../../actions/employees';

import './Dashboard.scss'


const Dashboard = (props) => {
    const [curId, setCurId] = useState('');
    const [curOpenModal, setCurOpenModal] = useState('');
    const dispatch = useDispatch()
    const { employees, employeesError, tableSort, count, pagination, filter, render } = useSelector(state => state.employees);

    useEffect(() => {
        const { min, max } = filter;
        if (min == 0 && max == 0) {
            dispatch(getAllEmployees(pagination))
        } else {
            dispatch(getfilteredEmployees(pagination, filter))
        }
    }, [render])

    useEffect(() =>{
        if (employeesError) toast.error(employeesError, { theme: "colored"})
    }, [employeesError])

    const handleOnCancel = () => {
        setCurOpenModal('')
    }

    const handleFetchMore = ({ pageSize = null, nextPage = null }) => {
        console.lo
        const page = pageSize
          ? 1
          : nextPage
            ? nextPage
            : pagination.page;
        const take = pageSize ? pageSize : pagination.pageSize;
        const newPagination = {
            page: page,
            pageSize: parseInt(take)
        }
        dispatch(changePagination(newPagination))

        const { min, max } = filter; 
        if (min == 0 && max == 0) {
            dispatch(getAllEmployees(newPagination));
        } else {
            dispatch(getfilteredEmployees(newPagination, filter))
        }
    };
    
    const handlePageSizeButtonClick = pageSize => {
        handleFetchMore({ pageSize });
    };
    
    const handlePageButtonClick = nextPage => {
        handleFetchMore({ nextPage });
    };

    const { column, data, direction } = tableSort;
    const resetPagination = {
        page: 1,
        pageSize: pagination.pageSize
    }
    return (
        <Container className='Dashboard'>
            <ToastContainer />
            <SalaryFilter 
                filterSalary={(data) => {
                    dispatch(getfilteredEmployees(resetPagination, data))
                    dispatch(changePagination(resetPagination))
                }}
                clearSalaryFilter={() => {
                    dispatch(getAllEmployees(resetPagination))
                    dispatch(changePagination(resetPagination))
                }}
            />
            
            <ScrollArea style={{ width: 'fill-available', height: 'calc(100vh - 250px)' }}>
                <Header as='h2' floated='left'>Employees</Header>
                <UploadModal
                    open={curOpenModal === 'Add'}
                    openModal={() => setCurOpenModal('Add')}
                    closeModal={() => handleOnCancel()}
                />
                <Table basic='very' sortable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell 
                                sorted={column === 'id' ? direction : null}
                                onClick={() => dispatch(changeSort('id'))}>
                                Id
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'employee_name' ? direction : null}
                                onClick={() => dispatch(changeSort('employee_name'))}>
                                Name
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'employee_login' ? direction : null}
                                onClick={() => dispatch(changeSort('employee_login'))}>
                                Login
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={column === 'employee_salary' ? direction : null}
                                onClick={() => dispatch(changeSort('employee_salary'))}>
                                Salary
                            </Table.HeaderCell>
                            <Table.HeaderCell className="right">Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map(emp => {
                            return (
                                <Table.Row key={emp.id + emp.employee_name}>
                                    <Table.Cell>{emp.id}</Table.Cell>
                                    <Table.Cell>{emp.employee_name}</Table.Cell>
                                    <Table.Cell>{emp.employee_login}</Table.Cell>
                                    <Table.Cell>{emp.employee_salary}</Table.Cell>
                                    <Table.Cell className="right">
                                        <EditModal
                                            key={emp.id}
                                            empId={emp.id}
                                            open={curId === emp.id &&
                                                curOpenModal === 'Edit'
                                            }
                                            openEditModal={(id) => {
                                                if (id === emp.id) {
                                                    setCurId(id);
                                                    setCurOpenModal('Edit')
                                                }
                                            }}
                                            closeEditModal={() => handleOnCancel()}
                                        />
                                        <DeleteModal
                                            id={emp.id}
                                            open={curId === emp.id && 
                                                curOpenModal === 'Delete'
                                            }
                                            openDeleteModal={(id) => {
                                                if (id === emp.id) {
                                                    setCurId(id);
                                                    setCurOpenModal('Delete')
                                                }
                                            }}
                                            closeDeleteModal={() => handleOnCancel()}
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>
            </ScrollArea>
            <Pagination
                pageSize={pagination.pageSize}
                page={pagination.page}
                totalResults={count}
                onPageSizeButtonClick={handlePageSizeButtonClick}
                onPageButtonClick={handlePageButtonClick}
            />
        </Container>
    )
}

export default Dashboard
