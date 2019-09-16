<template>
  <b-container>
    <b-row>
      <b-col>
        <h1 class="title">
          Add Sales Record Page
        </h1>
        <b-form-input :type="search" placeholder="Search for Product" />
      </b-col>
    </b-row>
    <b-row>
      <product name="Product 1" />
    </b-row>
  </b-container>
</template>

<script>
import Product from '~/components/Product.vue'

export default {
  components: {
    Product
  }
}
</script>
