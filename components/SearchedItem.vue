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
        <template v-if="add">
          <b-button variant="outline-primary" class="text-nowrap">
            <font-awesome-icon icon="plus" /><span class="d-none d-xl-inline">&nbsp;Compare</span>
          </b-button>
        </template>
        <template v-else>
          <b-button variant="outline-danger" class="text-nowrap">
            <font-awesome-icon icon="trash-alt" /><span class="d-none d-xl-inline">&nbsp;Don't Compare</span>
          </b-button>
        </template>
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
    },
    add: {
      type: Boolean,
      default: false,
      required: true
    }
  }

}
</script>
