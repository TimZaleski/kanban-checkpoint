import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { taskService } from '../services/TaskService'
import { commentService } from '../services/CommentService'

export class TaskController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getById)
      .get('/:id/comments', this.getCommentsByTask)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getById(req, res, next) {
    try {
      const data = await taskService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByTask(req, res, next) {
    try {
      const data = await commentService.getCommentsByTask(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getComments(req, res, next) {
    try {
      const data = await commentService.findById({ task: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const data = await taskService.create(req.body)
      res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      const data = await taskService.edit(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await taskService.delete(req.params.id)
      res.send('deleted')
    } catch (error) {
      next(error)
    }
  }
}
