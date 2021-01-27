<template>
  <div class="col-3 min-vh-100 chalk-border chalk" ondrop="drop(event)" ondragover="allowDrop(event)">
      <div class="row">
      <h1 class="chalk">
      {{ listProp.title.toUpperCase() }}
    </h1>
    <ul>
      <TaskComponent v-for="task in state.tasks" :key="task.id" :task-prop="task" />
    </ul>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'ListComponent',
  props: {
    listProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      tasks: computed(() => AppState.tasks.filter(t => t.listId === props.listProp.id))
    })
    return {
      state,
      allowDrop(ev) {
        ev.preventDefault()
      },
      drop(ev) {
        ev.preventDefault()
        var data = ev.dataTransfer.getData("text")
        ev.target.appendChild(document.getElementById(data))
      }
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
