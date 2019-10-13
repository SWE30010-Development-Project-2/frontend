<template>
  <button class="card mb-3 px-0" @click="$emit('click')">
    <tick v-if="ticked" />
    <b-img :src="imgSrc" :alt="name" fluid />
    <div v-if="small" class="card-body m-1 p-1">
      <!-- Small Variant -->
      <h6 class="card-title m-0 p-0 small">
        {{ name }}
      </h6>
      <p class="card-text text-muted text-nowrap verysmall">
        <font-awesome-icon icon="barcode" />&nbsp;{{ barcode }}
      </p>
    </div>
    <div v-else class="card-body">
      <!-- Normal Sized Variant -->
      <h6 class="card-title">
        {{ name }}
      </h6>
      <p class="card-text text-muted text-nowrap small">
        <font-awesome-icon icon="barcode" />&nbsp;{{ barcode }}
      </p>
    </div>
  </button>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBarcode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Tick from '~/components/Tick.vue'
library.add(faBarcode)

export default {
  components: {
    FontAwesomeIcon, Tick
  },
  props: {
    name: {
      type: String,
      default: null,
      required: true
    },
    barcode: {
      type: String,
      default: null,
      required: true
    },
    small: {
      type: Boolean,
      default: false
    },
    ticked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imgSrc () {
      return '/images/' + this.name.toLowerCase() + '.jpg'
    }
  }
}
</script>

<style lang="scss" scoped>
 .verysmall {
   font-size: 0.5rem;
 }
</style>
