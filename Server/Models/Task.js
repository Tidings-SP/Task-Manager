const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  task: String
})

const TaskModel = mongoose.model('task', TaskSchema)
module.exports = TaskModel