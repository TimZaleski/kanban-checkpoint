<template>
  <div class="col-3 min-vh-100 chalk-border chalk">
    <div class="row">
      <h1 class="chalk">
        {{ listProp.title.toUpperCase() }}
      </h1>
      <ul @drop="drop()" @dragover.prevent="allowDrop()" dropzone="zone" :id="listProp.id">
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
      allowDrop() {
      },
      drop() {
        const data = event.dataTransfer.getData('application/x-moz-node')
        if (event.target.nodeName == "LI")
        {
          event.target.parentNode.appendChild(document.getElementById(data))
        }
        else if (event.target.nodeName == "H2")
        {
          event.target.parentNode.parentNode.appendChild(document.getElementById(data))
        }
        else if (event.target.nodeName == "UL")
        {
          event.target.appendChild(document.getElementById(data))
        }
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
