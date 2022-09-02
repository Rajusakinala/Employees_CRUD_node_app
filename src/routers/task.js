const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

// Create task
router.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(req.body);
    console.log('New task created');
  } catch (e) {
    res.send(e);
    console.log('error rised');
  }
});

// GET Request for all tasks
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
    console.log('GET Requested for all tasks');
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET request for one task by _id
router.get('/tasks/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findById(_id);
    res.send(task);
    console.log('GET Requested for one task');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update an task
router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const updatesAllowed = ['discription', 'completed'];
  if (!updates.every((item) => updatesAllowed.includes(item))) {
    return res.status(404).send({ error: 'input keys not allowed' });
  }
  try {
    const _id = req.params.id;
    const task = await Task.findByIdAndUpdate(_id, req.body);
    res.send(task);
    console.log('PATCH Requested for update task');
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete an task
router.delete('/tasks/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const task = await Task.findByIdAndDelete(_id);
    res.send(task);
    console.log('Task DELETED from Database');
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
