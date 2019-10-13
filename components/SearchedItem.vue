<template>
  <b-list-group-item>
    <div class="d-flex">
      <div class="align-self-center">
        <b-img :src="imgSrc" :alt="name" width="50" height="50" />
      </div>
      <div class="px-4 flex-grow-1 align-self-center">
        {{ name }}
      </div>
      <div class="align-self-center">
        <remove-button @click="$emit('deleteItem')" />
      </div>
    </div>
  </b-list-group-item>
</template>

<script>
import RemoveButton from '~/components/RemoveButton.vue'

export default {
  components: {
    RemoveButton
  },
  props: {
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  computed: {
    imgSrc () {
      return '/images/' + this.name.toLowerCase() + '.jpg'
    }
  }
}
</script>
