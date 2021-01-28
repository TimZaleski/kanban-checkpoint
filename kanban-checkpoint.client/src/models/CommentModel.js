export default class Comment {
  constructor({ id, creatorId, creator, body, taskId }) {
    this.id = id
    this.creatorId = creatorId
    this.creator = creator
    this.body = body
    this.taskId = taskId
  }
}
