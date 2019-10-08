<template>
  <button class="card mb-3 px-0" @click="$emit('click')">
    <b-img :src="imgSrc" :alt="name" fluid />
    <div v-if="small" class="card-body m-1 p-1">
      <h6 class="card-title m-0 p-0">
        {{ name }}
      </h6>
      <p class="card-text text-muted text-nowrap">
        <small>
          <font-awesome-icon icon="barcode" />&nbsp;{{ barcode }}
        </small>
      </p>
    </div>
    <div v-else class="card-body">
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
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
