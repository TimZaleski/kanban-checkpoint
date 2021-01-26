<template>
  <div class="home flex-grow-1 d-flex flex-column chalkboard container-fluid">
    <div class="row">
      <div class="col-12">
        <h1 class="chalk">
          YOUR KANBANS
        </h1>
      </div>
    </div>
    <div class="row">
      <ul class="col">
        <KanbanListItemComponent v-for="kanban in state.kanbans" :key="kanban.id" :kanban-prop="kanban" />
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
import { kanbanService } from '../services/KanbanService'

export default {
  name: 'KanbanList',
  setup() {
    const state = reactive({
      kanbans: computed(() => AppState.kanbans),
      user: computed(() => AppState.user)
    })
    onMounted(async() => {
      try {
        await kanbanService.getAll()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style scoped lang="scss">
@font-face {
  font-family: "PWChalk";
  src: local("PWChalk"),
   url(../assets/font/PWChalk.ttf) format("truetype");
}

.chalk{
  color:rgb(221, 221, 221);
  font-family: "PWChalk";
}

.largeSize{
  font-size: 20vh;
}

.chalkboard{
 background-image: url('../assets/img/chalkboardBg3.jpg');
 background-size: cover;
 background-repeat: no-repeat;
}
</style>
