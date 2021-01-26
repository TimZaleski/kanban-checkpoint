/* eslint-disable */
<template>
  <li class="chalk spacebetween">
    <router-link :to="{name: 'Kanban', params: {id: kanbanProp.id}}">
      {{ kanbanProp.title.toUpperCase() }}
    </router-link>
    <i class="fa fa-times text-light" aria-hidden="true" @click="deleteKanban"></i>
  </li>
</template>

<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import { kanbanService } from '../services/KanbanService'
export default {
  name: 'KanbanListItemComponent',
  props: {
    kanbanProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
    })
    return {
      state,
      deleteKanban() {
        try {
          kanbanService.delete(props.kanbanProp.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.chalk{
  color:rgb(221, 221, 221);
  font-family: "PWChalk";
}
.spacebetween{
  display: flex;
  justify-content: space-between;
}

</style>
