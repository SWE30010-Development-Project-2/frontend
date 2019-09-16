<template>
  <b-row class="pb-1 pt-1 align-items-center">
    <b-col>{{ quantity }} x {{ name }}</b-col>
    <b-col cols="auto">
      <b-button variant="outline-danger">
        Remove
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
module.exports = {
  props: ['name', 'quantity']
}
</script>
