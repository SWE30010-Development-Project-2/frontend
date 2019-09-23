<template>
  <button class="card mb-3 px-0" @click="$emit('click')">
    <!-- <img class="card-img-top" :src="imgSrc" :alt="name"> -->
    <b-img :src="imgSrc" :alt="name" fluid />
    <div class="card-body">
      <h5 class="card-title">
        {{ name }}
      </h5>
      <p class="card-text text-muted text-nowrap">
        <font-awesome-icon icon="barcode" />&nbsp;{{ barcode }}
      </p>
    </div>
  </button>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBarcode } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faBarcode)

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    name: {
      type: String,
      default: null,
      required: true
    },
    imgSrc: {
      type: String,
      default: null,
      required: true
    },
    barcode: {
      type: String,
      default: null,
      required: true
    }
  }
}
</script>
