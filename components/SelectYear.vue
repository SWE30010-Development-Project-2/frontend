<template>
  <b-form-select v-model="value" :options="years" class="mb-3">
    <template v-slot:first>
      <option :value="null" disabled>
        -- Please select a year --
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
    },
    from: {
      type: Number,
      default: 2000,
      required: false
    },
    to: {
      type: Number,
      default: 2019,
      required: false
    }
  },
  data () {
    return {
      years: range(this.from, this.to).reverse()
    }
  }
}

// Helper Functions
const range = function (startYr, endYr) {
  return Array.from({ length: (endYr - startYr + 1) }, (v, n) => n + startYr)
}

</script>
