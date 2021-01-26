import { AppState } from '../AppState'
import Kanban from '../models/KanbanModel'
import List from '../models/ListModel'
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
      const res = await api.get('api/kanban/' + kanbanId)
      AppState.activeKanban = res.data.map(k => new Kanban(k))
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
      AppState.kanbans.filter(kanban => (kanban.id !== kanbanId))
    } catch (error) {

    }
  }
}

export const kanbanService = new KanbanService()
