<template>
  <b-modal v-if="transaction" :id="id" title="Transaction Information">
    <p>
      <strong>Time of Sale: </strong>{{ transaction.time }}
    </p>
    <p>
      <strong>Number of Items: </strong>{{ transaction.NoItems }}
    </p>
    <p v-if="transaction.price">
      <strong>Cost of sale: </strong>$ {{ transaction.price.toFixed(2) }}
    </p>
    <p>
      <strong>Items Sold: </strong>{{ transaction.itemsSoldLong }}
    </p>
    <div slot="modal-footer">
      <b-button variant="primary" @click="$bvModal.hide(id)">
        Done
      </b-button>
    </div>
  </b-modal>
</template>

<script>
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
  }
}
</script>
