<template>
  <div class="flex-grow-1 d-flex flex-column chalkboard container-fluid">
    <div class="row d-flex align-items-center">
      <div class="col-10">
        <h1 class="chalk largeSize" v-if="state.activeKanban.title">
          {{ state.activeKanban.title.toUpperCase() }}
        </h1>
      </div>
      <div class="col-2">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-outline-light chalk buttonStyle" data-toggle="modal" data-target="#createListModal">
          a LIST
        </button>
        <ListModalComponent />
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
import { onBeforeRouteLeave, useRoute } from 'vue-router'
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
        logger.log('on before mounted, ' + route.params.id)
        await kanbanService.getById(route.params.id, state.user.id)
        await kanbanService.getListsById(route.params.id)
        await kanbanService.getTasksById(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    onBeforeRouteLeave(() => {
      AppState.activeKanban = {}
      AppState.activeTask = {}
      AppState.lists = []
      AppState.tasks = []
      AppState.comments = []
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
.buttonStyle{
  font-size: 4vh;
}
.buttonStyle:hover{
  color:rgb(34, 34, 34) !important;
}
</style>
