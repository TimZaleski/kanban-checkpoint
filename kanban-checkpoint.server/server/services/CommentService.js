import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class CommentService {
  async findById(id) {
    const comment = await dbContext.Comments.findById(id)
    if (!comment) {
      throw new BadRequest('Invalid Id')
    }
    return comment
  }

  async getCommentsByTask(taskId) {
    const comments = await dbContext.Comments.find(comment => comment.taskId === taskId).populate('task')
    if (!comments) {
      throw new BadRequest('Invalid Id')
    }
    return comments
  }

  async create(body) {
    return await dbContext.Comments.create(body)
  }

  async edit(comment) {
    const com = await dbContext.Comments.findOneAndUpdate({ _id: comment.id }, comment, { new: true }).populate('creator')
    if (!com) {
      throw new BadRequest('You are not the user, or this is not a valid comment')
    }
    return com
  }

  async delete(id, userId) {
    const comment = await dbContext.Comments.findOneAndRemove({ _id: id, creatorId: userId })
    if (!comment) {
      throw new BadRequest('You are not the user, or this is not a valid comment')
    }
    return 'successfully deleted'
  }
}

export const commentService = new CommentService()
