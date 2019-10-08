<template>
  <b-form-select v-model="value" :options="months" class="mb-3" @input="$emit('input',value)">
    <template v-slot:first>
      <option :value="null" disabled>
        -- Please select a month --
      </option>
    </template>
  </b-form-select>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null,
      required: true
    }
  },
  data () {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
  }
}
</script>
