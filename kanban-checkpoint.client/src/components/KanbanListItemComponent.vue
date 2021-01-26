/* eslint-disable */
<template>
  <router-link :to="{name: 'Kanban', params: {id: kanbanProp.id}}">
    <li class="chalk">
      {{ kanbanProp.title.toUpperCase() }}
    </li>
    <i class="fa fa-times chalk" aria-hidden="true"></i>
  </router-link>
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
      deleteBlog() {
        try {
          kanbanService.delete(props.kanbanProp.id)
        } catch (error) {
          logger.error(error)
        }
      }
      // selectKanban() {
      //   try {
      //     logger.log(props.kanbanProp.id + 'getById from @click on kanbanlistitemcomponent')
      //     kanbanService.getById(props.kanbanProp.id)
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // }
    }
  }
}
</script>

<style scoped>
.chalk{
  color:rgb(221, 221, 221);
  font-family: "PWChalk";
}

</style>
