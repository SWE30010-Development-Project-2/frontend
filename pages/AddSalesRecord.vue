<template>
  <div>
    <navbar title="Add Sales Record Page" />
    <b-container fluid>
      <b-row>
        <b-col cols="8">
          <b-form-row class="pt-3 pb-3">
            <b-col>
              <b-form-input :type="search" placeholder="Search Products" />
            </b-col>
            <b-col cols="auto">
              <b-button variant="primary">
                Enter Barcode
              </b-button>
            </b-col>
          </b-form-row>
          <b-row>
            <product name="Paracetemol" img-src="http://image.made-in-china.com/2f0j00leMQCKIBCYuo/Paracetamol-Tablet.jpg" />
            <product name="Sambucol" img-src="https://www.yourdiscountchemist.com.au/media/catalog/product/cache/afad95d7734d2fa6d0a8ba78597182b7/2/4/247688_2.jpg" />
            <product name="Xanax" img-src="http://www.kwikmed.in/images/source/Xanax2mg.jpg" />
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
  }
}
</script>
