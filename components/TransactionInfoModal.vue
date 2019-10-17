<template>
  <b-modal v-if="transaction" :id="id" title="Transaction Information">
    <p>
      <strong>Time of Sale: </strong>{{ formatAsTime(transaction.createdAt) }}
    </p>
    <p>
      <strong>Number of Items: </strong>{{ transaction.NoItems }}
    </p>
    <p v-if="transaction.price">
      <strong>Cost of sale: </strong>{{ formatAsPrice(transaction.price) }}
    </p>
    <p>
      <strong>Items Sold: </strong>{{ formatListAllProducts(transaction.productsNice) }}
    </p>
    <p v-if="transaction.employee">
      <strong>Employee Id: </strong>{{ transaction.employee.username }}
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
    transaction: {
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
