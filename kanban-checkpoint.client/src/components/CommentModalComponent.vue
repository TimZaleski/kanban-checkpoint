<template>
  <!-- Create Modal -->
  <div class="modal fade"
       :id="'commentModal' + taskProp.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="createCommentModal"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createCommentModal">
            Comments
          </h5>
          <button id="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body pt-0">
          <div class="row">
            <div class="col">
              <CommentComponent v-for="comment in state.comments" :key="comment.id" :comment-prop="comment" />
            </div>
          </div>
          <form @submit.prevent="createComment">
            <div class="input-group my-3">
              <input type="text"
                     name="Comment Body"
                     id="CommentBody"
                     class="form-control background-danger"
                     placeholder="Comment"
                     v-model="state.newComment.body"
              >
              <div class="input-group-append">
                <button class="btn btn-outline-dark" type="submit" id="button-addon2">
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { commentService } from '../services/CommentService'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'
export default {
  name: 'CommentModalComponent',
  props: {
    taskProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      newComment: {},
      comments: computed(() => AppState.comments)
      // .filter(c => c.taskId === props.taskProp.id)
    })
    return {
      state,
      async createComment() {
        try {
          state.newComment.taskId = props.taskProp.id
          await commentService.create(state.newComment)
          state.newComment = {}
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }

}

</script>

<style>
.modal-content{
  background-color: #ffc;
}
.modal-body{
  color:rgb(0, 0, 0);
  font-family: "Reenie Beanie";
}
input[type="text"], textarea {
  background-color: #ffc;

}
</style>
