import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentService {
  async getById(commentId) {
    try {
      const res = await api.get('api/comment/' + commentId)
      AppState.activecomment = res.data.map(c => new Comment(c))
    } catch (error) {

    }
  }

  async create(comment) {
    try {
      const res = await api.post('api/comment', comment)
      AppState.comments = [...AppState.comments, res.data.map(c => new Comment(c))]
    } catch (error) {

    }
  }

  async edit(updatedcomment, commentId) {
    try {
      const res = await api.put('api/comment/' + commentId, updatedcomment)
      const index = AppState.comments.findIndex(comment => comment.id === res.data.id)
      AppState.comments.splice(index, 1, res.data)
    } catch (error) {

    }
  }

  async delete(commentId) {
    try {
      await api.delete('api/comment/' + commentId)
      AppState.comments.filter(comment => (comment.id !== commentId))
    } catch (error) {

    }
  }
}

export const commentService = new CommentService()
