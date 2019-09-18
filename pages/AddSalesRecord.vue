<template>
  <div>
    <navbar title="Add Sales Record Page" />
    <b-container fluid>
      <b-row>
        <b-col cols="8">
          <b-form-row class="pt-3 pb-3">
            <b-col>
              <b-form-input :type="search" placeholder="Search Products or Enter Barcode" />
            </b-col>
          </b-form-row>
          <b-row>
            <product name="Paracetamol" img-src="/images/paracetamol.jpg" barcode="1244534534" />
            <product name="Sambucol" img-src="/images/sambucol.jpg" barcode="1244999534" />
            <product name="Xanax" img-src="/images/xanax.jpg" barcode="124454444" />
          </b-row>
        </b-col>
        <b-col cols="4" class="bg-light">
          <h2 class="h3 align-items-center border-bottom pt-3 pb-3 mb-3">
            Added items
          </h2>
          <added-item name="Paracetemol" quantity="3" />
          <added-item name="Sambucol" quantity="1" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Product from '~/components/Product.vue'
import Navbar from '~/components/Navbar.vue'
import AddedItem from '~/components/AddedItem.vue'

export default {
  components: {
    Product, Navbar, AddedItem
  },
  layout: 'default'
}
</script>
