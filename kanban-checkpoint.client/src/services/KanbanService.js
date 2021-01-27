import { AppState } from '../AppState'
import Kanban from '../models/KanbanModel'
import List from '../models/ListModel'
import Task from '../models/TaskModel'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class KanbanService {
  async getAll() {
    try {
      const res = await api.get('api/kanban')
      AppState.kanbans = res.data.map(k => new Kanban(k))
    } catch (error) {

    }
  }

  async getById(kanbanId) {
    try {
      logger.log(kanbanId + 'from kanbanservice getById before api call')
      const res = await api.get('api/kanban/' + kanbanId)
      AppState.activeKanban = new Kanban(res.data)
      logger.log(AppState.activeKanban + 'from kanbanservice getById after api call')
    } catch (error) {

    }
  }

  async getListsById(kanbanId) {
    try {
      const res = await api.get('api/kanban/' + kanbanId + '/lists')
      AppState.lists = res.data.map(l => new List(l))
    } catch (error) {

    }
  }

  async getTasksById(kanbanId) {
    try {
      const res = await api.get('api/kanban/' + kanbanId + '/tasks')
      AppState.tasks = res.data.map(t => new Task(t))
    } catch (error) {

    }
  }

  async create(kanban) {
    try {
      const res = await api.post('api/kanban', kanban)
      AppState.kanbans.push(res.data)
    } catch (error) {

    }
  }

  async edit(updatedKanban, kanbanId) {
    try {
      const res = await api.put('api/kanban/' + kanbanId, updatedKanban)
      const index = AppState.kanbans.findIndex(kanban => kanban.id === res.data.id)
      AppState.kanbans.splice(index, 1, res.data)
    } catch (error) {

    }
  }

  async delete(kanbanId) {
    try {
      await api.delete('api/kanban/' + kanbanId)
      AppState.kanbans = AppState.kanbans.filter(kanban => (kanban.id !== kanbanId))
    } catch (error) {

    }
  }
}

export const kanbanService = new KanbanService()
