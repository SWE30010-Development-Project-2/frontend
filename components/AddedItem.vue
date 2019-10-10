<template>
  <b-row class="pb-1 pt-1 align-items-center">
    <b-col>
      {{ quantity }} x {{ name }}
    </b-col>
    <b-col cols="auto">
      <span class="d-inline"><number v-model="quantity" @input="$emit('update-qty',quantity)" /></span>
      <span class="d-inline">
        <remove-button @click="$emit('deleteItem',index)" />
      </span>
    </b-col>
  </b-row>
</template>

<script>
import Number from '~/components/NumberPlusMinus.vue'
import RemoveButton from '~/components/RemoveButton.vue'

export default {
  components: {
    Number,
    RemoveButton
  },
  props: ['name', 'quantity', 'index']
  // props: {
  //   name: {
  //     type: String,
  //     default: '',
  //     required: true
  //   },
  //   quantity: {
  //     type: Number,
  //     default: 1,
  //     required: true
  //   },
  //   index: {
  //     type: Number,
  //     default: -1,
  //     required: true
  //   }
  // }
}
</script>
