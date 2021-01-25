import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Kanban = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Kanban.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Kanban
