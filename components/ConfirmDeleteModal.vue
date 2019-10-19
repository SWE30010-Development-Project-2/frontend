<template>
  <b-modal :id="id" title="Confirm Delete">
    <p>Are you sure you would like to delete this item?</p>
    <p v-for="(property, propertyName) in itemPropertyLabels" :key="propertyName">
      <strong>{{ itemPropertyLabels[propertyName] }}: </strong>{{ item[propertyName] }}
    </p>
    <div slot="modal-footer">
      <b-button variant="danger" @click="$bvModal.hide(id); $emit('confirm-deletion')">
        Delete
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
      default: 'confirm-delete',
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
    }
  }
}
</script>
