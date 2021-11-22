const asyncHandler = require('express-async-handler');

const Task = require('../models/Task');

addTask_post = asyncHandler(async (req, res) => {
  const { text, day, reminder } = req.body;

  const task = new Task({
    text,
    day,
    reminder,
  });

  const taskCreated = await task.save();

  if (taskCreated) {
    res.status(200).json(taskCreated);
  } else {
    res.status(500);
    throw new Error('Error creating Task!');
  }
});

getTasks_get = asyncHandler(async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json(tasks);
});

getSingleTask_get = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const task = await Task.findOne({ _id: id });

  console.log(task);

  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404);
    throw new Error('Task was not found!');
  }
});

updateTask_put = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const { text, day, reminder } = req.body;

  const taskUpdated = await Task.findByIdAndUpdate(
    { _id: id },
    {
      text,
      day,
      reminder,
    }
  );

  if (taskUpdated) {
    res.status(201).json(taskUpdated);
  } else {
    res.status(500);
    throw new Error('Updating data failed!');
  }
});

deleteTask_delete = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const taskDeleted = await Task.findByIdAndDelete({ _id: id });

  if (taskDeleted) {
    res.status(200).json({ message: 'Task successfully deleted!' });
  } else {
    res.status(400);
    throw new Error('Task not found in the database');
  }
});

module.exports = {
  getTasks_get,
  getSingleTask_get,
  addTask_post,
  deleteTask_delete,
  updateTask_put,
};
