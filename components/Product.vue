<template>
  <b-col>
    <b-card
      :title="name"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    />
  </b-col>
</template>

<script>
module.exports = {
  props: ['name']
}
</script>
