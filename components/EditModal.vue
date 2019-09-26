<template>
  <b-modal :id="id" title="Edit Sale">
    <p>Edit Transaction Items</p>
    <p v-for="(property, propertyName) in item" :key="propertyName">
      <strong>{{ itemPropertyLabels[propertyName] }}: </strong>{{ property }}
    </p>
    <div slot="modal-footer">
      <b-button variant="danger" @click="$bvModal.hide(id); $emit('confirm-editing')">
        Edit
      </b-button>
      <b-button variant="outline-dark" @click="$bvModal.hide(id)">
        Cancel
      </b-button>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: 'confirm-edit',
      required: true
    },
    item: {
      type: Object,
      default: () => null,
      required: true
    },
    itemPropertyLabels: {
      type: Object,
      default: () => null,
      required: true
    },
    index: {
      type: Number,
      default: -1,
      required: true
    }
  }
}
</script>
