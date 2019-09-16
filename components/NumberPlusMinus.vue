<template>
  <b-button-group>
    <b-button variant="outline-dark" @click="value--">
      -
    </b-button>
    <b-form-input
      v-model="value"
      :min="min"
      :max="max"
      :step="step"
      class="w-50"
    />
    <b-button variant="outline-dark" @click="value++">
      +
    </b-button>
    </b-form-input>
  </b-button-group>
</template>

<script>
module.exports = {
  props: ['min', 'max', 'step'],
  data () {
    return {
      value: 1
    }
  }
}
</script>
