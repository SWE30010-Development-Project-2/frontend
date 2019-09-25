<template>
  <b-row class="pb-1 pt-1 align-items-center">
    <b-col>
      {{ quantity }} x {{ name }}
    </b-col>
    <b-col cols="auto">
      <span class="d-inline"><number v-model="quantity" @input="$emit('update-qty',quantity)" /></span>
      <span class="d-inline"><b-button variant="outline-danger" class="text-nowrap" @click="$emit('deleteItem',index)">
        <font-awesome-icon icon="trash-alt" /><span class="d-none d-xl-inline">&nbsp;Remove</span>
      </b-button></span>
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
