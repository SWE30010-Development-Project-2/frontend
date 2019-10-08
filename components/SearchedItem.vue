<template>
  <b-list-group-item>
    <div class="d-flex">
      <div class="align-self-center">
        <b-img :src="img" :alt="name" width="50" height="50" />
      </div>
      <div class="px-4 flex-grow-1 align-self-center">
        {{ name }}
      </div>
      <div class="align-self-center">
        <b-button variant="outline-danger" class="text-nowrap" @click="$emit('deleteItem')">
          <font-awesome-icon icon="trash-alt" /><span class="d-none d-xl-inline">&nbsp;Remove</span>
        </b-button>
      </div>
    </div>
  </b-list-group-item>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus)
library.add(faTrashAlt)

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    img: {
      type: String,
      default: '',
      required: true
    }
  }

}
</script>
