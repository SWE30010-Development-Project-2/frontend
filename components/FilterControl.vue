<template>
  <b-form-group
    label="Filter"
    label-cols-sm="3"
    label-align-sm="right"
    label-size="sm"
    label-for="filterInput"
    class="mb-0"
  >
    <b-input-group size="sm">
      <b-form-input
        id="filterInput"
        v-model="filter"
        type="search"
        placeholder="Type to Search"
        @input="$emit('input',filter)"
      />
      <b-input-group-append>
        <b-button :disabled="!filter" @click="filter = ''">
          Clear
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form-group>
</template>

<script>
export default {
  props: {
    filter: {
      type: String,
      default: '',
      required: true
    }
  }
}
</script>
