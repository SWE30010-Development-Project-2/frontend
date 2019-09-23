<template>
  <b-button-group>
    <b-button variant="outline-dark" style="width:38px;" @click="decr()">
      −
    </b-button>
    <b-form-input
      :value="value"
      class="rounded-0 text-center d-none d-xl-inline"
      style="width:38px"
      @input="update()"
    />

    <b-button variant="outline-dark" style="width:38px" @click="incr()">
      +
    </b-button>
  </b-button-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1,
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
