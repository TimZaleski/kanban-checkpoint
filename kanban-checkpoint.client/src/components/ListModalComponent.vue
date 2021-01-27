<template>
  <!-- Create Modal -->
  <div class="modal fade"
       id="createListModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="createListModal"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createListModal">
            Add A New List
          </h5>
          <button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body">
          <form @submit.prevent="createList">
            <div class="form-group">
              <input type="text"
                     name="List title"
                     id="ListTitle"
                     class="form-control"
                     placeholder="List title"
                     v-model="state.newList.title"
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
import { reactive } from 'vue'
import { listService } from '../services/ListService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {
  name: 'ListModalComponent',
  setup() {
    const route = useRoute()
    const state = reactive({
      newList: {}
    })
    return {
      state,
      async createList() {
        try {
          await listService.create(state.newList, route.params.id)
          state.newList = {}
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
