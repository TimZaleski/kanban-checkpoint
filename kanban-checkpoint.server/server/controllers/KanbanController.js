import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { kanbanService } from "../services/KanbanService";
import { listService } from "../services/ListService";

export class KanbanController extends BaseController {
  constructor() {
    super('api/kanban')
    this.router
      // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/lists", this.getLists)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.delete)
  }

  async getAll(req, res, next) {
    try {
      let data = await kanbanService.find(req.query)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      let data = await kanbanService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async getLists(req, res, next) {
    try {
      let data = await listService.find({ kanban: req.params.id })
      res.send(data)
    } catch (error) {
      next(error)
    }
  }


  async create(req, res, next) {
    try {
      let data = await kanbanService.create(req.body)
      res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      req.body.id = req.params.id
      let data = await kanbanService.edit(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      await kanbanService.delete(req.params.id)
      res.send("deleted");
    } catch (error) {
      next(error)
    }
  }
}