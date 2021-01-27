<template>
  <div class="flex-grow-1 d-flex flex-column justify-content-center chalkboard container-fluid">
    <div class="row">
      <div class="col">
        <h1 class="chalk largeSize" v-if="state.activeKanban.title">
          {{ state.activeKanban.title.toUpperCase() }}
        </h1>
      </div>
    </div>
    <div class="row">
      <ListComponent v-for="list in state.lists" :key="list.id" :list-prop="list" />
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive } from 'vue'
import { AppState } from '../AppState'
import { kanbanService } from '../services/KanbanService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
export default {
  name: 'KanbanDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      activeKanban: computed(() => AppState.activeKanban),
      user: computed(() => AppState.user),
      lists: computed(() => AppState.lists)
    })
    onBeforeMount(async() => {
      try {
        logger.log('on mounted, ' + route.params.id)
        await kanbanService.getById(route.params.id, state.user.id)
        await kanbanService.getListsById(route.params.id)
        // await kanbanService.getTasksById(route.params.id)
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
  font-size: 8vh;
}

.chalkboard{
 background-image: url('../assets/img/chalkboardBg3.jpg');
 background-size: cover;
 background-repeat: no-repeat;
}
.chalk-border {
  border: 25px solid rgba(255,255,255,.8);
  border-image: url("https://www.unicefusa.org/sites/default/files/answer-box.png") 20;
}
</style>
