import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class KanbanService {
  async find(query = {}, userId) {
    const kanbans = await dbContext.Kanbans.find({ creatorId: userId }).populate('creator')
    return kanbans
  }

  async findById(id) {
    const kanban = await dbContext.Kanbans.findById(id).populate('creator')
    if (!kanban) {
      throw new BadRequest('Invalid Id')
    }
    return kanban
  }

  async create(body) {
    return await dbContext.Kanbans.create(body)
  }

  async edit(kanban) {
    const kan = await dbContext.Kanbans.findOneAndUpdate({ _id: kanban.id }, kanban, { new: true }).populate('creator')
    if (!kan) {
      throw new BadRequest('You are not the user, or this is not a valid kanban')
    }
    return kan
  }

  async delete(id, userId) {
    const kanban = await dbContext.Kanbans.findOneAndRemove({ _id: id, creatorId: userId })
    if (!kanban) {
      throw new BadRequest('You are not the user, or this is not a valid kanban')
    }
    return 'successfully deleted'
  }
}

export const kanbanService = new KanbanService()
