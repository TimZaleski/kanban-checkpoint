<template>
  <li class="row stickyNote" draggable="true" :id="taskProp.id" @dragstart="drag()" @click="openComments()">
    <div class="col-1 offset-10 justify-content-right">
      <button type="button" class="btn btn-outline-dark buttonStyle text-center pl-1 pb-0 pt-1 pr-1" @click.stop="deleteTask">
        X
      </button>
    </div>
    <div class="col">
      <h2>{{ taskProp.title.toUpperCase() }}</h2>
    </div>
  </li>
  <CommentModalComponent :task-prop="taskProp" />
</template>

<script>
import { reactive } from 'vue'
import { taskService } from '../services/TaskService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { AppState } from '../AppState'
export default {
  name: 'TaskComponent',
  props: {
    taskProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
    })
    return {
      state,
      async deleteTask() {
        try {
          taskService.delete(props.taskProp.id)
        } catch (error) {
          logger.error(error)
        }
      },
      drag() {
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('application/x-moz-node', event.target.id)
      },
      async openComments() {
        try {
          logger.log(AppState.account)
          await taskService.getCommentsById(props.taskProp.id)
          $('#commentModal' + props.taskProp.id).modal()
        } catch (error) {
          logger.log(error)
        }
      }
    }
  }
}
</script>

<style scoped>
@font-face {
  font-family: "Reenie Beanie";
  src: local("Reenie Beanie"),
   url(../assets/font/ReenieBeanie-Regular.ttf) format("truetype");
}

.buttonStyle{
  font-size: 2vh;
}

.chalk-border {
  border: 25px solid rgba(255,255,255,.8);
  border-image: url("https://www.unicefusa.org/sites/default/files/answer-box.png") 20;
}

.chalk{
  color:rgb(221, 221, 221);
  font-family: "PWChalk";
}

.stickyNote{
  color:rgb(0, 0, 0);
  font-family: "Reenie Beanie";
}

*{
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0 ;
  padding-bottom: 0 ;
}
body{
  font-family:arial,sans-serif;
  font-size:100%;
  margin:3em;
  background:#666;
  color:#fff;
}
h2,p{
  font-size:100%;
  font-weight:normal;
}
ul,li{
  list-style:none;
}
ul{
  overflow:hidden;
  padding:3em;
}

ul li{
  margin:1em;
  float:left;
}

ul li h2{
  font-size:200%;
  font-weight:bold;
  padding-bottom:10px;
}

ul li{
  text-decoration:none;
  color:#000;
  background:#ffc;
  display:block;
  height:30vh;
  width:30vh;
  padding:1vh;
  /* Firefox */
  -moz-box-shadow:5px 5px 7px rgb(12, 12, 12);
  /* Safari+Chrome */
  -webkit-box-shadow: 5px 5px 7px rgba(12,12,12,.7);
  /* Opera */
  box-shadow: 5px 5px 7px rgba(12,12,12,.7);
  -webkit-transform:rotate(-6deg);
  -o-transform:rotate(-6deg);
  -moz-transform:rotate(-6deg);
  transform:rotate(-6deg);
}

ul li:nth-child(even) a{
  -o-transform:rotate(4deg);
  -webkit-transform:rotate(4deg);
  -moz-transform:rotate(4deg);
  transform:rotate(4deg);
  position:relative;
  top:5px;
}
ul li:nth-child(3n) a{
  -o-transform:rotate(-3deg);
  -webkit-transform:rotate(-3deg);
  -moz-transform:rotate(-3deg);
  transform:rotate(-3deg);
  position:relative;
  top:-5px;
}
ul li:nth-child(5n) a{
  -o-transform:rotate(5deg);
  -webkit-transform:rotate(5deg);
  -moz-transform:rotate(5deg);
  transform:rotate(5deg);
  position:relative;
  top:-10px;
}

ul li:hover,ul li:focus{
  -moz-box-shadow:10px 10px 7px rgba(0,0,0,.7);
  -webkit-box-shadow: 10px 10px 7px rgba(0,0,0,.7);
  box-shadow:10px 10px 7px rgba(0,0,0,.7);
  -webkit-transform: scale(1.25);
  -moz-transform: scale(1.25);
  -o-transform: scale(1.25);
  transform: scale(1.25);
  position:relative;
  z-index:5;
}

ul li{
  text-decoration:none;
  color:#000;
  background:#ffc;
  display:block;
  height:30vh;
  width:30vh;
  padding:1vh;
  -moz-box-shadow:5px 5px 7px rgba(33,33,33,1);
  -webkit-box-shadow: 5px 5px 7px rgba(33,33,33,.7);
  box-shadow: 5px 5px 7px rgba(33,33,33,.7);
  -moz-transition:-moz-transform .15s linear;
  -o-transition:-o-transform .15s linear;
  -webkit-transition:-webkit-transform .15s linear;
  transition:-webkit-transform .15s linear;
}
</style>
