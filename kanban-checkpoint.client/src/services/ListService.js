import { AppState } from '../AppState'
import { api } from './AxiosService'

class ListService {
  async getAll() {
    try {
      const res = await api.get('api/list')
      AppState.lists = res.data.map(l => new List(l))
    } catch (error) {

    }
  }

  async getById(listId) {
    try {
      const res = await api.get('api/list/' + listId)
      AppState.activelist = res.data.map(l => new List(l))
    } catch (error) {

    }
  }

  async getTasksByListId(listId) {
    try {
      const res = await api.get('api/list/' + listId + '/tasks')
      AppState.tasks = [...AppState.tasks, res.data.map(t => new Task(t))]
    } catch (error) {

    }
  }

  async create(list) {
    try {
      const res = await api.post('api/list', list)
      AppState.lists = [...AppState.lists, res.data.map(l => new List(l))]
    } catch (error) {

    }
  }

  async edit(updatedlist, listId) {
    try {
      const res = await api.put('api/list/' + listId, updatedlist)
      const index = AppState.lists.findIndex(list => list.id === res.data.id)
      AppState.lists.splice(index, 1, res.data)
    } catch (error) {

    }
  }

  async delete(listId) {
    try {
      await api.delete('api/list/' + listId)
      AppState.lists.filter(list => (list.id !== listId))
    } catch (error) {

    }
  }
}

export const listService = new ListService()
