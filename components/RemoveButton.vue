<template>
  <b-button variant="outline-danger" class="text-nowrap" @click="$emit('click')">
    <font-awesome-icon icon="trash-alt" /><span class="d-none d-xl-inline">&nbsp;Remove</span>
  </b-button>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt)

export default {
  components: {
    FontAwesomeIcon
  }
}
</script>
