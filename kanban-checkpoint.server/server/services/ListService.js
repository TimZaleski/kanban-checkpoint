import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListService {
  async getAll(query = {}) {
    const lists = await dbContext.Lists.find(query).populate('creator kanban')
    return lists
  }

  async findById(id) {
    const list = await dbContext.Lists.findById(id).populate('creator kanban')
    if (!list) {
      throw new BadRequest('Invalid Id')
    }
    return list
  }

  async getListsByKanban(query = {}) {
    const lists = await dbContext.Lists.find(query).populate('creator kanban')
    if (!lists) {
      throw new BadRequest('Invalid Id')
    }
    return lists
  }

  async create(body) {
    return await dbContext.Lists.create(body)
  }

  async edit(list) {
    const li = await dbContext.Lists.findOneAndUpdate({ _id: list.id }, list, { new: true }).populate('creator kanban')
    if (!li) {
      throw new BadRequest('You are not the user, or this is not a valid list')
    }
    return li
  }

  async delete(id, userId) {
    const list = await dbContext.Lists.findOneAndRemove({ _id: id, creatorId: userId })
    if (!list) {
      throw new BadRequest('You are not the user, or this is not a valid list')
    }
    return 'successfully deleted'
  }
}

export const listService = new ListService()
