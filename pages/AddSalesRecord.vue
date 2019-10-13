<template>
  <div>
    <navbar title="Add Sales Record" />
    <b-container fluid>
      <b-row>
        <b-col cols="8" class="products">
          <b-form-row class="pt-3 pb-3">
            <b-col>
              <b-form-input v-model="search" :type="search" placeholder="Search Products or Enter Barcode" />
            </b-col>
          </b-form-row>
          <b-row>
            <b-col v-for="product in filteredProducts" :key="product.name" cols="4" lg="3">
              <product :name="product.name" :img-src="product.img" :barcode="product.barcode" @click="addItem(product.name)" />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="4" class="sidebar bg-light">
          <h2 class="h3 align-items-center border-bottom pt-3 pb-3 text-nowrap">
            Added items
          </h2>
          <div class="added-items-list pt-3 pb-3">
            <div v-for="(item, index) in items" :key="index">
              <added-item :quantity="item.qty" :name="item.name" :index="index" @update-qty="item.qty=$event" @deleteItem="items.splice(index, 1)" />
            </div>
          </div>
          <div class="align-items-center border-top pt-3 pb-3">
            <b-button variant="primary" class="text-nowrap w-100" :disabled="items.length === 0" @click="recordSale()">
              Record Sale
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">
.products {
  min-height: calc(100vh - 3.5rem);
}
.sidebar {
  position: fixed;
  top: 3.5rem;
  right: 0;
  height: calc(100vh - 3.5rem);
}
.added-items-list{
  height: calc(100% - 9rem )
}

html {
  overflow-y: scroll; // Always display scroll bar
}
</style>

<script>
import Product from '~/components/Product.vue'
import Navbar from '~/components/Navbar.vue'
import AddedItem from '~/components/AddedItem.vue'
import ItemListText from '~/components/ItemListText.vue'
import FETCHPRODUCTS from '~/graphql/product/FETCHPRODUCTS.gql'

export default {
  components: {
    Product, Navbar, AddedItem
  },
  layout: 'default',
  data () {
    return {
      items: [],
      products: [],
      search: ''
    }
  },
  computed: {
    filteredProducts () {
      return this.products.filter((product) => {
        const name = product.name.toLowerCase()
        const barcode = product.barcode.toLowerCase()
        const search = this.search.toLowerCase()

        return name.includes(search) || barcode.includes(search) ||
        search.includes(name) || search.includes(barcode)
      })
    }
  },
  async mounted () {
    await this.fetchProducts()
  },
  methods: {
    addItem (name) {
      const list = this.items.filter(item => (item.name === name))
      if (list.length === 0) {
        this.items.push({ name, qty: 1 })
      } else {
        list[0].qty++
      }
    },
    recordSale () {
      // Send to server

      // Display Message
      this.notifySaleRecorded()

      // Clear list of items
      this.items = []
    },
    notifySaleRecorded () {
      // Create the message
      const message = this.$createElement(ItemListText, {
        props: {
          items: this.items
        }
      })

      // Display the notification
      this.$bvToast.toast([message], {
        title: 'Sale Recorded Successfully',
        autoHideDelay: 2500,
        appendToast: true,
        variant: 'primary',
        solid: true
      })
    },
    async fetchProducts () {
      await this.$apollo
        .query({
          query: FETCHPRODUCTS
        })
        .then(({ data }) => {
          this.products = data.products
        })
    }
  }
}
</script>
