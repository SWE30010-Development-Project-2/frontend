<template>
  <b-badge pill variant="primary" style="position:absolute;" class="p-1">
    <font-awesome-icon icon="check" />
  </b-badge>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCheck)

export default {
  components: {
    FontAwesomeIcon
  }
}
</script>
