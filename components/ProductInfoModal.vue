<template>
  <b-modal v-if="product" :id="id" title="Product Information">
    <p>
      <strong>Product Name: </strong>{{ product.name }}
    </p>
    <p>
      <strong>Description: </strong>{{ product.description }}
    </p>
    <p v-if="product.price">
      <strong>Price: </strong>{{ formatAsPrice(product.price) }}
    </p>
    <p>
      <strong>Barcode: </strong>{{ product.barcode }}
    </p>
    <div slot="modal-footer">
      <b-button variant="primary" @click="$bvModal.hide(id)">
        Done
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import Formatting from '~/assets/formatting.js'

export default {
  props: {
    id: {
      type: String,
      default: 'info-modal',
      required: false
    },
    product: {
      type: Object,
      default: () => null,
      required: true
    }
  },
  methods: {
    ...Formatting
  }
}
</script>
