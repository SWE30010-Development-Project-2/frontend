<template>
  <b-col cols="2">
    <b-card
      :title="name"
      :img-src="imgSrc"
      :img-alt="name"
      img-top
      tag="button"

      class="mb-2 pl-0 pr-0"
    />
  </b-col>
</template>

<script>
module.exports = {
  props: ['name', 'imgSrc']
}
</script>
