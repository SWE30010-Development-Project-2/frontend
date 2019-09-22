<template>
  <b-button-group>
    <b-button variant="outline-dark" class="w-50" @click="decr()">
      −
    </b-button>
    <b-form-input
      :value="value"
      class="w-50 rounded-0 text-center"
      @input="update()"
    />

    <b-button variant="outline-dark" class="w-50" @click="incr()">
      +
    </b-button>
  </b-button-group>
</template>

<script>
export default {
  props: {
    title: {
      type: Number,
      default: 0,
      required: true
    }
  },
  methods: {
    incr () {
      this.value++
      this.update()
    },
    decr () {
      if (this.value > 1) {
        this.value--
        this.update()
      }
    },
    update () {
      this.$emit('input', this.value)
    }
  }
}
</script>
