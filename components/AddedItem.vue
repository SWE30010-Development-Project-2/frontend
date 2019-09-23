<template>
  <b-row class="pb-1 pt-1 align-items-center">
    <b-col cols="4">
      {{ quantity }} x {{ name }}
    </b-col>
    <b-col cols="4">
      <number v-model="quantity" @input="$emit('update-qty',quantity)" />
    </b-col>
    <b-col cols="4" class="text-right">
      <b-button variant="outline-danger" class="w-100 text-nowrap" @click="$emit('deleteItem',index)">
        <font-awesome-icon icon="trash-alt" /> Remove
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Number from '~/components/NumberPlusMinus.vue'
library.add(faTrashAlt)

export default {
  components: {
    Number,
    FontAwesomeIcon
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
