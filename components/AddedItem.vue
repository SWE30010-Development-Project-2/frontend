<template>
  <b-row class="pb-1 pt-1 align-items-center">
    <b-col cols="5">
      {{ quantity }} x {{ name }}
    </b-col>
    <b-col cols="4">
      <number v-model="quantity" />
    </b-col>
    <b-col cols="3" class="text-right">
      <b-button variant="outline-danger" class="w-100">
        Remove
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import Number from '~/components/NumberPlusMinus.vue'

export default {
  components: {
    Number
  },
  props: ['name', 'quantity']
}
</script>
