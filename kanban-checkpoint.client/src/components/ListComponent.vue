<template>
  <div class="col-3 min-vh-100 chalk-border chalk">
    <div class="row">
      <div class="col-1 offset-9 justify-content-right">
        <button type="button" class="btn btn-outline-light text-center buttonStyle chalk pl-2 pb-0 pt-1 pr-1" @click="deleteList">
          X
        </button>
      </div>
      <div class="col-12">
        <h1 class="chalk">
          {{ listProp.title.toUpperCase() }}
        </h1>
      </div>
    </div>
    <div class="row">
      <ul @drop="drop()" @dragover.prevent="allowDrop()" dropzone="zone" :id="listProp.id">
        <TaskComponent v-for="task in state.tasks" :key="task.id" :task-prop="task" />
      </ul>
    </div>
    <div class="row">
      <div class="col-1">
        <button type="button" class="btn btn-outline-light text-center buttonStyle chalk pl-1 pb-0 pt-1 pr-1">
          a
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { listService } from '../services/ListService'
import { taskService } from '../services/TaskService'
export default {
  name: 'ListComponent',
  props: {
    listProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      tasks: computed(() => AppState.tasks.filter(t => t.listId === props.listProp.id))
    })
    return {
      state,
      deleteList() {
        try {
          listService.delete(props.listProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      allowDrop() {
      },
      drop() {
        const data = event.dataTransfer.getData('application/x-moz-node')
        const newTask = AppState.tasks.find(t => t.id === data)
        if (event.target.nodeName === 'LI') {
          newTask.listId = event.target.parentNode.id
          taskService.edit(newTask, data)
          event.target.parentNode.appendChild(document.getElementById(data))
        } else if (event.target.nodeName === 'H2') {
          newTask.listId = event.target.parentNode.parentNode.id
          taskService.edit(newTask, data)
          event.target.parentNode.parentNode.appendChild(document.getElementById(data))
        } else if (event.target.nodeName === 'UL') {
          newTask.listId = event.target.id
          taskService.edit(newTask, data)
          event.target.appendChild(document.getElementById(data))
        }
      }
    }
  }
}
</script>

<style scoped>
.chalk-border {
  border: 25px solid rgba(255,255,255,.8);
  border-image: url("https://www.unicefusa.org/sites/default/files/answer-box.png") 20;
}

.chalk{
  color:rgb(221, 221, 221);
  font-family: "PWChalk";
}

.hoverable {
  cursor: pointer;
}

.buttonStyle{
  font-size: 3vh;
}
.buttonStyle:hover{
  color:rgb(34, 34, 34) !important;
}
</style>
