<template>
  <!-- Create Modal -->
  <div class="modal fade"
       :id="'taskModal' + listProp.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="createTaskModal"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createTaskModal">
            Add A New Task
          </h5>
          <button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="createTask">
            <div class="form-group">
              <input type="text"
                     name="Task title"
                     id="TaskTitle"
                     class="form-control"
                     placeholder="Task title"
                     v-model="state.newTask.title"
              >
            </div>
            <button type="submit" class="btn btn-success">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { taskService } from '../services/TaskService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
export default {
  name: 'TaskModalComponent',
  props: {
    listProp: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({
      newTask: {},
      Tasks: computed(() => AppState.Tasks)
    })
    return {
      state,
      async createTask() {
        try {
          state.newTask.listId = props.listProp.id
          state.newTask.kanbanId = route.params.id
          await taskService.create(state.newTask)
          state.newTask = {}
          document.getElementById('closeModal').click()
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }

}

</script>

<style>

</style>
