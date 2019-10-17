<template>
  <b-modal :id="id" title="Edit Transaction">
    <b-list-group>
      <searched-item v-for="(product, index) in transaction.products" :key="index" :name="product.name" @deleteItem="transaction.products.splice(index, 1)" />
    </b-list-group>
    <div slot="modal-footer">
      <b-button variant="primary" @click="$bvModal.hide(id); $emit('commitEdit', transaction)">
        Edit
      </b-button>
      <b-button variant="outline-dark" @click="$bvModal.hide(id)">
        Cancel
      </b-button>
    </div>
  </b-modal>
</template>

<script>
import SearchedItem from '~/components/SearchedItem.vue'
export default {
  components: {
    SearchedItem
  },
  props: {
    id: {
      type: String,
      default: 'edit-modal',
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
