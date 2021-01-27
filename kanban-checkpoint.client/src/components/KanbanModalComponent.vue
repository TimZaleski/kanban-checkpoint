<template>
  <!-- Create Modal -->
  <div class="modal fade"
       id="createKanbanModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="createKanbanModal"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createKanbanModal">
            Create A New Kanban Board
          </h5>
          <button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="createKanban">
            <div class="form-group">
              <input type="text"
                     name="Kanban title"
                     id="KanbanTitle"
                     class="form-control"
                     placeholder="Kanban title"
                     v-model="state.newKanban.title"
              >
            </div>
            <button type="submit" class="btn btn-success">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { kanbanService } from '../services/KanbanService'
import { logger } from '../utils/Logger'
export default {
  name: 'KanbanModalComponent',
  setup() {
    const state = reactive({
      newKanban: {},
      activeKanban: computed(() => AppState.activeKanban)
    })
    return {
      state,
      async createKanban() {
        try {
          await kanbanService.create(state.newKanban)
          state.newKanban = {}
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
