const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { parse } = require('csv-parse');
const fileUpload = require('express-fileupload')
const employees = require('./employees.json')
const bodyParser = require('body-parser')

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload())

app.get('/', (req, res) => {
    res.send(
    `<div>
        <p>Employee API endpoints is working...</p>
        <p>List of available API as below:</p>
        <ul>
            <li>GET /api/employees</li>
            <li>GET /api/employees/:id</li>
            <li>GET /api/employees/filter</li>
            <li>POST /api/employees</li>
            <li>PUT /api/employees/:id</li>
            <li>DELETE /api/employees/:id</li>
        </ul>
    </div>`
    )
});

app.get('/api/employees', (req, res) => {
    const page = req.query.page;
    const limit = req.query.pageSize;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const count = employees.length

    const result = {
        employees: employees.slice(startIndex, endIndex),
        count: count
    }

    res.status(200).send(result)
});

app.get('/api/employees/filter', (req, res) => {
    const page = req.query.page;
    const limit = req.query.pageSize;
    let max, min = 0
    if ('max' in req.query) {
        max = req.query.max
    }

    if ('min' in req.query) {
        min = req.query.min
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let data = employees
    if (max != 0 || min != 0) {
        data = employees.filter(emp => parseFloat(emp.employee_salary) <= parseFloat(max) && parseFloat(emp.employee_salary) >= parseFloat(min))
    }
    const count = data.length
    data = data.slice(startIndex, endIndex)

    const result = {
        employees: data,
        count: count
    }

    res.status(200).send(result)
});


app.get('/api/employees/:id', (req, res) => {
    const employee = employees.find(employee => employee.id === parseInt(req.params.id))
    if (!employee) return res.status(404).send(`The employee with id ${req.params.id} is not exist`);

    res.status(200).send(employee)
});

app.post('/api/employees', (req, res) => {
    const file = req.files.file;
    const path = __dirname + "/files/" + file.name;
    let addEmp = []
    let updateEmp = []
    fs.createReadStream(path)
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        let data = csvrow.map(str => str.split(',')).flat();
        // Check if employee id exist
        const employee = employees.find(employee => employee.id === parseInt(data[0]))
        if (!employee) {
            // Add new employee
            const newEmployee = {
                id: employees.length + 1,
                employee_login:  data[1],
                employee_name: data[2],
                employee_salary: data[3]
            }
            employees.push(newEmployee)
            addEmp.push(newEmployee)
        } else {
            // Update new employee
            employee.employee_login = data[1];
            employee.employee_name = data[2];
            employee.employee_salary = data[3];
            updateEmp.push(employee)
        }       
    })
    .on('end',function() {
        res.status(201).send({
            add: addEmp,
            update: updateEmp
        })
    });
});

app.put('/api/employees/:id', (req, res) => {
    const employee = employees.find(employee => employee.id === parseInt(req.params.id))
    if (!employee) return res.sendStatus(404).send(`The employee with id ${req.params.id} is not exist`);

    // const { error } = validateEmployee(req.body)
    // if (error) return res.status(400).status(error.details[0].message);

    employee.employee_name = req.body.employee_name;
    employee.employee_salary = req.body.employee_salary;
    employee.employee_login = req.body.employee_login;
    res.status(200).send(employee)
});

app.delete('/api/employees/:id', (req, res) => {
    const employee = employees.find(employee => employee.id === parseInt(req.params.id))
    if (!employee) return res.status(404).send(`The employee with id ${req.params.id} is not exist`);

    const index = employees.indexOf(employee);
    employees.splice(index, 1)

    res.status(204).send(employee)
});

const validateEmployee = (employee) => {
    console.log(employee)
    const schema = {
        employee_name: Joi.string().required,
        employee_login: Joi.string().required,
        employee_salary: Joi.string().required
    };

    return Joi.validate(employee, schema);
}

app.listen(3000, () => console.log('listening to port 3000...'))