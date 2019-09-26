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
  padding-top: 15px;
   justify-content: center;
  align-items: center;
  text-align: center;
   margin-bottom: 12px; /* Add some space below the input */
}
</style>

<script>
// export default {
//   props: {
//
//   }
// }
</script>
