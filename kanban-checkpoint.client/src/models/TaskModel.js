export default class Task {
  constructor({ id, creatorId, title, listId }) {
    this.id = id
    this.creatorId = creatorId
    this.title = title
    this.listId = listId
  }
}
