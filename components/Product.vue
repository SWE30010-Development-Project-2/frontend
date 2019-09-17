<template>
  <b-col cols="2">
    <button class="card mb-3 px-0">
      <img class="card-img-top" :src="imgSrc" :alt="name">
      <div class="card-body">
        <h5 class="card-title">
          {{ name }}
        </h5>
        <p class="card-text">
          <small class="text-muted">{{ barcode }}</small>
        </p>
      </div>
    </button>
  </b-col>
</template>

<script>
module.exports = {
  props: ['name', 'imgSrc', 'barcode']
}
</script>
