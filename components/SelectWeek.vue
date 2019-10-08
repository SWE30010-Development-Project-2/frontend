<template>
  <b-form-select v-model="value" :options="weeks" class="mb-3" @input="$emit('input',value)">
    <template v-slot:first>
      <option :value="null" disabled>
        -- Please select a week --
      </option>
    </template>
  </b-form-select>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: null,
      required: true
    }
  },
  data () {
    return {
      weeks: range(1, 53)
    }
  }
}

// Helper Functions
const range = function (startYr, endYr) {
  return Array.from({ length: (endYr - startYr + 1) }, (v, n) => n + startYr)
}

</script>
