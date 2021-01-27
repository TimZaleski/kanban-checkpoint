import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Task = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    listId: { type: String, ref: 'List', required: true },
    kanbanId: { type: String, ref: 'Kanban', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
Task.virtual('list', {
  localField: 'listId',
  ref: 'List',
  foreignField: '_id',
  justOne: true
})
Task.virtual('kanban', {
  localField: 'kanbanId',
  ref: 'Kanban',
  foreignField: '_id',
  justOne: true
})

export default Task
