<template>
  <b-button-group>
    <template v-if="value">
      <b-button variant="primary">
        {{ optionA }}
      </b-button>
      <b-button variant="outline-primary" @click="value=false; $emit('input',value)">
        {{ optionB }}
      </b-button>
    </template>
    <template v-else>
      <b-button variant="outline-primary" @click="value=true; $emit('input',value)">
        {{ optionA }}
      </b-button>
      <b-button variant="primary">
        {{ optionB }}
      </b-button>
    </template>
  </b-button-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    },
    optionA: {
      type: String,
      required: true
    },
    optionB: {
      type: String,
      required: true
    }
  }
}
</script>
