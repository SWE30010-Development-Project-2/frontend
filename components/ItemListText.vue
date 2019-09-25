<template>
  <div>
    <p v-for="(item, index) in items" :key="index">
      {{ item.qty }} x {{ item.name }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: null,
      required: true
    }
  }
}
</script>
