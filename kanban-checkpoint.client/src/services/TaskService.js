import { AppState } from '../AppState'
import { api } from './AxiosService'
import Task from '../models/TaskModel'
import Comment from '../models/CommentModel'
class TaskService {
  async getById(taskId) {
    try {
      const res = await api.get('api/tasks/' + taskId)
      AppState.activeTask = res.data.map(t => new Task(t))
    } catch (error) {

    }
  }

  async getCommentsById(taskId) {
    try {
      const res = await api.get('api/tasks/' + taskId + '/comments')
      AppState.comments = res.data.map(c => new Comment(c))
    } catch (error) {

    }
  }

  async create(task) {
    try {
      const res = await api.post('api/tasks', task)
      AppState.tasks = [...AppState.tasks, new Task(res.data)]
    } catch (error) {

    }
  }

  async edit(updatedtask, taskId) {
    try {
      const res = await api.put('api/tasks/' + taskId, updatedtask)
      const index = AppState.tasks.findIndex(task => task.id === res.data.id)
      AppState.tasks.splice(index, 1, res.data)
    } catch (error) {

    }
  }

  async delete(taskId) {
    try {
      await api.delete('api/tasks/' + taskId)
      AppState.tasks.filter(task => (task.id !== taskId))
    } catch (error) {

    }
  }
}

export const taskService = new TaskService()
