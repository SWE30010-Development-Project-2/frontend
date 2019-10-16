<template>
  <div>
    <b-button @click="$emit('today')">
      Today
    </b-button>
    <b-button @click="$emit('week')">
      Past Week
    </b-button>
    <b-button @click="$emit('month')">
      Past Month
    </b-button>
    <b-button @click="$emit('year')">
      Past Year
    </b-button>
    </b>
  </div>
</template>

<style lang="scss" scoped>
div {
   justify-content: center;
  align-items: center;
  text-align: center;
}
</style>

<script>
// export default {
//   props: {
//
//   }
// }
</script>
