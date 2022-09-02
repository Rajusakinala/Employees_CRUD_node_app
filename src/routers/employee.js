const express = require('express');
const router = new express.Router();
const Employee = require('../models/employee');


// Create an Employee
router.post('/employees', async (req, res) => {
  const employee = new Employee(req.body);
  try {
    await employee.save();
    res.status(201).send(req.body);
    console.log('new employee created');
  } catch (e) {
    res.send(e);
    console.log('error rised');
  }
});

// GET Request for all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.send(employees);
    console.log('GET Requested for all employees');
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET request for one employee by _id
router.get('/employees/:id', async (req, res) => {
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
router.patch('/employees/:id', async (req, res) => {
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
router.delete('/employees/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const employee = await Employee.findByIdAndDelete(_id);
    res.send(employee);
    console.log('Employee DELETED from Database');
  } catch (err) {
    res.status(500).send(err);
  }
});


module.exports = router;