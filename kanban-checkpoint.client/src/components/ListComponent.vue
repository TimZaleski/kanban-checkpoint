<template>
  <div class="col-3 min-vh-100 chalk-border chalk">
      <div class="row">
        <!-- <TaskComponent v-for="task in state.tasks" :key="task.id" :task-prop="task" /> -->
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'List',
  props: {
    listProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      tasks: computed(() => AppState.tasks.filter(t => t.listId === props.listProp.id))
    })
    return {
      state
    }
  }
}
</script>

<style>
.chalk-border {
  border: 25px solid rgba(255,255,255,.8);
  border-image: url("https://www.unicefusa.org/sites/default/files/answer-box.png") 20;
}

.chalk{
  color:rgb(221, 221, 221);
  font-family: "PWChalk";
}
</style>
