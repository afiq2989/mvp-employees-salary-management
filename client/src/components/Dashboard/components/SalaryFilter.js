import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

const SalaryFilter = ({ filterSalary, clearSalaryFilter }) => {
    const [state, setState] = useState({
        min: 0,
        max: 0,
        clearButton: false
    })
    const handleInputChange = (e) => {
        e.preventDefault()
        setState({
            ...state,
            clearButton: false,
            [e.target.name]: e.target.value
        })
    }

    const handleSalaryFilter = () => {
        const { min, max } = state;
        filterSalary(state);
        setState({
            ...state,
            clearButton: true
        })
    }

    const handleClearFilter = () => {
        setState({
            min: 0,
            max: 0,
            clearButton: false
        })
        clearSalaryFilter()
    }

    const { min, max, clearButton } = state;
    return (
        <div className='Search'>
            <Input
                name='min'
                value={min}
                icon='dollar sign'
                iconPosition='left'
                placeholder='Minimum Salary'
                type='number'
                onChange={handleInputChange}
            />
            -
            <Input
                name='max'
                value={max}
                icon='dollar sign'
                iconPosition='left'
                placeholder='Maximum Salary'
                type='number'
                action={{
                    color: clearButton ? 'red' : 'grey',
                    icon: clearButton ? 'cancel' : 'search',
                    onClick: clearButton ? handleClearFilter : handleSalaryFilter
                }}
                onChange={handleInputChange}
            />
        </div>
    )
}

SalaryFilter.propTypes = {}

export default SalaryFilter