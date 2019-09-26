<template>
  <b-form-group
    label="Sort"
    label-cols-sm="3"
    label-align-sm="right"
    label-size="sm"
    label-for="sortBySelect"
    class="mb-0"
  >
    <b-input-group size="sm">
      <b-form-select id="sortBySelect" v-model="sortValue.sortBy" :options="sortOptions" class="w-75" @input="$emit('input',sortValue)">
        <template v-slot:first>
          <option value="">
            -- none --
          </option>
        </template>
      </b-form-select>
      <b-form-select v-model="sortValue.sortDesc" size="sm" :disabled="!sortValue.sortBy" class="w-25" @input="$emit('input',sortValue)">
        <option :value="false">
          Asc
        </option>
        <option :value="true">
          Desc
        </option>
      </b-form-select>
    </b-input-group>
  </b-form-group>
</template>

<script>
export default {
  props: {
    sortValue: {
      type: Object,
      default: () => ({ sortBy: '', sortDesc: false }),
      required: true
    },
    sortOptions: {
      type: Array,
      required: true
    }
  }
}
</script>
