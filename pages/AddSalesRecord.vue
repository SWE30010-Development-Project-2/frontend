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
            <b-col v-for="product in products" :key="product.name" cols="2">
              <product :name="product.name" :img-src="product.img" :barcode="product.barcode" @click="addItem(product.name)" />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="4" class="bg-light">
          <h2 class="h3 align-items-center border-bottom pt-3 pb-3 mb-3">
            Added items
          </h2>
          <div v-for="(item, index) in items" :key="index">
            <added-item :quantity="item.qty" :name="item.name" :index="index" @update-qty="item.qty=$event" @deleteItem="items.splice(index, 1)" />
          </div>
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
  layout: 'default',
  data () {
    return {
      items: [],
      products: [
        { name: 'Paracetamol', img: '/images/paracetamol.jpg', barcode: '1244534534' },
        { name: 'Sambucol', img: '/images/sambucol.jpg', barcode: '1244999534' },
        { name: 'Xanax', img: '/images/xanax.jpg', barcode: '124454444' }
      ]
    }
  },
  methods: {
    addItem (name) {
      const list = this.items.filter(item => (item.name === name))
      if (list.length === 0) {
        this.items.push({ name, qty: 1 })
      } else {
        list[0].qty++
      }
    }
  }
}
</script>
