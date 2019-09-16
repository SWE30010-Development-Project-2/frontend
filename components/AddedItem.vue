<template>
  <b-row class="pb-1 pt-1 align-items-center">
    <b-col cols="4">
      {{ quantity }} x {{ name }}
    </b-col>
    <b-col cols="4">
      <number
        v-model="quantity"
        min="1"
        max="999999999"
        step="1"
      />
    </b-col>
    <b-col cols="auto">
      <b-button variant="outline-danger">
        Remove
      </b-button>
      </number-plus-minus>
    </b-col>
  </b-row>
</template>

<script>
import Number from '~/components/NumberPlusMinus.vue'

export default {
  components: {
    Number
  },
  props: ['name'],
  data () {
    return {
      quantity: 2
    }
  }
}
</script>
