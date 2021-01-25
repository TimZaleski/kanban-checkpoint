import mongoose from 'mongoose'
const Schema = mongoose.Schema

const List = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String },
    kanbanId: { type: String, ref: 'Kanban', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

List.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
List.virtual('kanban', {
  localField: 'kanbanId',
  ref: 'Kanban',
  foreignField: '_id',
  justOne: true
})

export default List
