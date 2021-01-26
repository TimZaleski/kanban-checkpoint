export default class Comment {
  constructor({ id, creatorId, body, taskId }) {
    this.id = id
    this.creatorId = creatorId
    this.body = body
    this.taskId = taskId
  }
}
