<template>
  <b-modal :id="id" title="Medicine Information">
    <p v-for="i in 20" :key="i" class="my-4" /></p>
    <p>Name: {{ item.name }}</p>
    <p>Information: {{ item.info }}</p>
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
    },
    index: {
      type: Number,
      default: -1,
      required: true
    }
  }
}
</script>
