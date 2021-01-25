import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TaskService {
  async findById(id) {
    const task = await dbContext.Tasks.findById(id)
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async getTasksByList(listId) {
    const tasks = await dbContext.Tasks.find(task => task.listId === listId).populate('list creator')
    if (!tasks) {
      throw new BadRequest('Invalid Id')
    }
    return tasks
  }

  async create(body) {
    return await dbContext.Tasks.create(body)
  }

  async edit(task) {
    const tsk = await dbContext.Tasks.findOneAndUpdate({ _id: task.id }, task, { new: true }).populate('creator')
    if (!tsk) {
      throw new BadRequest('You are not the user, or this is not a valid task')
    }
    return tsk
  }

  async delete(id, userId) {
    const task = await dbContext.Tasks.findOneAndRemove({ _id: id, creatorId: userId })
    if (!task) {
      throw new BadRequest('You are not the user, or this is not a valid task')
    }
    return 'successfully deleted'
  }
}

export const taskService = new TaskService()
