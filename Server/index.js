const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TaskModel = require('./Models/Task')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/task')

app.get('/get', (req, res) => {
  TaskModel.find()
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
  const {id} = req.params;
  console.log(id)
  const updatedTask = req.body.task;
  TaskModel.findByIdAndUpdate({_id: id}, { task: updatedTask })
  .then(result => res.json(result))
  .catch(err => console.log(err))
})

app.delete('/delete/:id', (req, res) => {
  const {id} = req.params;
  console.log(id)
  TaskModel.findByIdAndDelete({_id: id})
  .then(result => res.json(result))
  .catch(err => console.log(err))
})

app.post('/create', ((req, res) => {
  const task = req.body.task;
  TaskModel.create({
    task: task
  }).then(result => res.json(result))
  .catch(err => res.json(err))
}))
app.listen(3001, () => {
  console.log("Running..")
})
