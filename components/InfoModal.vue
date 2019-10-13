<template>
  <b-modal :id="id" title="Medicine Information">
    <p>Name: {{ item.name }}</p>
    <p>Description: {{ item.description }}</p>
    </p>
    <div slot="modal-footer">
      <b-button variant="primary" @click="$bvModal.hide(id);">
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
