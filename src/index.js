const express = require('express');
const app = express();
require('./db/mongoose');
const Employee = require('./models/employee');

app.use(express.json());

// Create an Employee
app.post('/employees', async (req, res) => {
  const employee = new Employee(req.body);
  try {
    await employee.save();
    res.status(201).send(req.body);
    console.log('POST Requested');
  } catch (e) {
    res.send(e);
    console.log('error rised');
  }
});

// GET Request for all employees
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.send(employees);
    console.log('GET Requested');
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET request for one employee by _id
app.get('/employees/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const employee = await Employee.findById(_id);
    res.send(employee);
    console.log('GET Requested for one Employee');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update an employee
app.patch('/employees/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const updatesAllowed = ['name', 'age', 'email', 'role'];
  if (!updates.every((item) => updatesAllowed.includes(item))) {
    return res.status(404).send({ error: 'input keys not allowed' });
  }
  try {
    const _id = req.params.id;
    const employee = await Employee.findByIdAndUpdate(_id, req.body);
    res.send(employee);
    console.log('PATCH Requested for update Employee');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete an employee
app.delete('/employees/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const employee = await Employee.findByIdAndDelete(_id);
    res.send(employee);
    console.log('Employee DELETED from Database');
  } catch (err) {
    res.status(500).send(err);
  }
});

const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
