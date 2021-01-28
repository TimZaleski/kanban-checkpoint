<template>
  <div class="row justify-content-between border-bottom border-bottom-dark">
    <div class="col-10">
      <p>{{ commentProp.body }}</p>
      <h6 v-if="commentProp.creator">
        By: {{ commentProp.creator.name }}
      </h6>
    </div>
    <div class="col-2">
      <button v-if="(commentProp.creatorId === state.account.id)" type="button" class="btn btn-danger buttonStyle py-1 px-2 m-1" @click="deleteComment">
        X
      </button>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { commentService } from '../services/CommentService'
export default {
  name: 'CommentComponent',
  props: {
    commentProp: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      account: computed(() => AppState.account)
    })
    return {
      state,
      deleteComment() {
        try {
          commentService.delete(props.commentProp.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }

}
</script>

<style scoped>
.buttonStyle{
  font-size: 2vh;
}
</style>
