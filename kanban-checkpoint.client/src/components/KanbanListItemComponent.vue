/* eslint-disable */
<template>
  <router-link :to="{name: 'KanbanDetails', params: {id: kanbanProp.id}}">
    <div class="col-3">
      <h2>{{ kanbanProp.title }}</h2>
    </div>
  </router-link>
</template>

<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import { kanbanService } from '../services/KanbanService'
export default {
  name: 'KanbanListItem',
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
      },
      selectKanban() {
        try {
          kanbanService.getById(props.kanbanProp.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
.BlogComponent{
  border-style: solid;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.BlogComponent :hover
{
  color: blue;
}
</style>
