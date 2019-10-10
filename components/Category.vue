<template>
  <button class="card mb-3 px-0" @click="$emit('click')">
    <tick v-if="ticked" />
    <b-img :src="imgSrc" :alt="name" fluid />
    <div class="card-body m-1 p-1">
      <h6 class="card-title m-0 p-0 small">
        {{ name }}
      </h6>
      <p class="card-text text-muted text-nowrap verysmall">
        {{ description }}
      </p>
    </div>
  </button>
</template>

<script>

import Tick from '~/components/Tick.vue'

export default {
  components: {
    Tick
  },
  props: {
    name: {
      type: String,
      default: null,
      required: true
    },
    description: {
      type: String,
      default: null,
      required: true
    },
    imgSrc: {
      type: String,
      default: null,
      required: true
    },
    ticked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
 .verysmall {
   font-size: 0.5rem;
 }
</style>
