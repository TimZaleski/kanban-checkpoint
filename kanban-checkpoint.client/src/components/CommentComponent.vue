<template>
  <h6>{{ commentProp.body }}</h6>
  <h6 v-if="commentProp.creator">
    {{ commentProp.creator.name }}
  </h6>
</template>

<script>
// import { reactive } from 'vue'
export default {
  name: 'CommentComponent',
  props: {
    commentProp: { type: Object, required: true }
  },
  setup(props) {
    // const state = reactive({

    // })
  }

}
</script>

<style>

</style>
