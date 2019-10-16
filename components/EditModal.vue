<template>
  <b-modal :id="id" title="Edit Transaction Items">
    <b-form>
      <b-form-group
        v-for="(property, propertyName) in item"
        :id="'fieldset-' + propertyName"
        :key="propertyName"
        label-cols="4"
        :label="itemPropertyLabels[propertyName] + ': '"
        :label-for="propertyName"
      >
        <b-form-input
          :id="propertyName"
          v-model="item[propertyName]"
          type="text"
          :placeholder="itemPropertyLabels[propertyName]"
        />
      </b-form-group>
    </b-form>
    <div slot="modal-footer">
      <b-button variant="primary" @click="$bvModal.hide(id); $emit('commitEdit', item)">
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
