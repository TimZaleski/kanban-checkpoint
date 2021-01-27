import { AppState } from '../AppState'
import List from '../models/ListModel'
import Task from '../models/TaskModel'
import { api } from './AxiosService'

class ListService {
  async getAll() {
    try {
      const res = await api.get('api/lists')
      AppState.lists = res.data.map(l => new List(l))
    } catch (error) {

    }
  }

  async getById(listId) {
    try {
      const res = await api.get('api/lists/' + listId)
      AppState.activelist = res.data.map(l => new List(l))
    } catch (error) {

    }
  }

  async getTasksByListId(listId) {
    try {
      const res = await api.get('api/lists/' + listId + '/tasks')
      AppState.tasks = [...AppState.tasks, res.data.map(t => new Task(t))]
    } catch (error) {

    }
  }

  async create(list, kanbanId) {
    try {
      list.kanbanId = kanbanId
      const res = await api.post('api/lists', list)
      AppState.lists = [...AppState.lists, new List(res.data)]
    } catch (error) {

    }
  }

  async edit(updatedlist, listId) {
    try {
      const res = await api.put('api/lists/' + listId, updatedlist)
      const index = AppState.lists.findIndex(list => list.id === res.data.id)
      AppState.lists.splice(index, 1, res.data)
    } catch (error) {

    }
  }

  async delete(listId) {
    try {
      await api.delete('api/lists/' + listId)
      AppState.lists.filter(list => (list.id !== listId))
    } catch (error) {

    }
  }
}

export const listService = new ListService()
