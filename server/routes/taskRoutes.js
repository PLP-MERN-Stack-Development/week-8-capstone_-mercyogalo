import express from 'express';
import Task from '../models/Task.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

router.use(protect);

router.get('/', async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, user: req.user._id });
  await task.save();
  res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.json(task);
});

router.delete('/:id', async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: 'Deleted' });
});

export default router;
