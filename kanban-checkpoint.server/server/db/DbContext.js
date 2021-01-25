import mongoose from 'mongoose'
import KanbanSchema from '../models/Kanban'
import ListSchema from '../models/List'
import TaskSchema from '../models/Task'
import CommentSchema from '../models/Comment'
import AccountSchema from '../models/Account'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Kanbans = mongoose.model('Kanban', KanbanSchema);
  Lists = mongoose.model('List', ListSchema);
  Tasks = mongoose.model('Task', TaskSchema);
  Comments = mongoose.model('Comment', CommentSchema);
}

export const dbContext = new DbContext()
