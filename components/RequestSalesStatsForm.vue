<template>
  <div>
    <b-row class="mb-4">
      <b-col>
        <h2>Select Items</h2>
        <b-card no-body>
          <b-tabs v-model="selected.tab" card>
            <b-tab title="All Items" active>
              <b-card-text>
                All Items Selected
              </b-card-text>
            </b-tab>
            <b-tab title="Single Items">
              <b-row>
                <b-col cols="8">
                  <h4>Choose Items for the Report</h4>
                  <b-form-row class="pt-0 pb-3">
                    <b-col>
                      <b-form-input v-model="searchProducts" :type="search" placeholder="Search Products or Enter Barcode" />
                    </b-col>
                  </b-form-row>
                  <b-row>
                    <b-col v-for="product in filteredProducts" :key="product.name" cols="2">
                      <product
                        small
                        :ticked="selected.products.filter(item => item.name == product.name).length > 0 "
                        :name="product.name"
                        :barcode="product.barcode"
                        @click="toggleItem(product.name)"
                      />
                    </b-col>
                  </b-row>
                </b-col>
                <b-col cols="4">
                  <h4>Selected Items</h4>
                  <b-list-group>
                    <searched-item v-for="(item, index) in selected.products" :key="index" :name="item.name" img="/images/paracetamol.jpg" @deleteItem="selected.products.splice(index, 1)" />
                  </b-list-group>
                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col>
        <h2>Time Period</h2>
        <b-card>
          <b-row class="mb-4">
            <b-col>
              <h4>Time Granularity</h4>
              <toggle-control v-model="timePeriod.weekly" option-a="Weekly" option-b="Monthly" />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h4>Start Date</h4>
              <select-year v-model="timePeriod.startDate.year" :from="2000" :to="2019" />
              <select-week v-if="timePeriod.weekly" v-model="timePeriod.startDate.week" />
              <select-month v-else v-model="timePeriod.startDate.month" />
            </b-col>
            <b-col>
              <h4>End Date</h4>
              <select-year v-model="timePeriod.endDate.year" :from="2000" :to="2019" />
              <select-week v-if="timePeriod.weekly" v-model="timePeriod.endDate.week" />
              <select-month v-else v-model="timePeriod.endDate.month" />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col class="text-right">
        <b-button variant="primary" :disabled="!valid" @click="generateReport()">
          Generate Report
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import SearchedItem from '~/components/SearchedItem.vue'
import SelectMonth from '~/components/SelectMonth.vue'
import SelectYear from '~/components/SelectYear.vue'
import SelectWeek from '~/components/SelectWeek.vue'
import ToggleControl from '~/components/ToggleControl.vue'
import Product from '~/components/Product.vue'
import FETCHPRODUCTS from '~/graphql/product/FETCHPRODUCTS.gql'

export default {
  components: {
    SearchedItem, SelectMonth, SelectYear, SelectWeek, ToggleControl, Product
  },
  data () {
    return {
      timePeriod: {
        weekly: true,
        startDate: {
          year: null,
          week: null,
          month: null
        },
        endDate: {
          year: null,
          week: null,
          month: null
        }
      },
      selected: {
        tab: 0, // 0 all, 1 individual, 2 categories
        categories: [],
        products: []
      },
      products: [],
      categories: [
        { name: 'Painkillers', img: '/images/paracetamol.jpg', description: 'Panadol, Nurofen' },
        { name: 'Antibiotics', img: '/images/paracetamol.jpg', description: 'Yay superbugs' }
      ],
      searchProducts: '',
      searchCategories: ''
    }
  },
  computed: {
    filteredProducts () {
      return this.products.filter((product) => {
        const name = product.name.toLowerCase()
        const barcode = product.barcode.toLowerCase()
        const search = this.searchProducts.toLowerCase()

        return name.includes(search) || barcode.includes(search) ||
        search.includes(name) || search.includes(barcode)
      })
    },
    filteredCategories () {
      return this.categories.filter((category) => {
        const search = this.searchCategories.toLowerCase()
        const name = category.name.toLowerCase()

        return name.includes(search) || search.includes(name)
      })
    },
    valid () {
      // Validate date
      const validYear = this.timePeriod.startDate.year && this.timePeriod.endDate.year
      const validWeek = this.timePeriod.startDate.week && this.timePeriod.endDate.week
      const validMonth = this.timePeriod.startDate.month && this.timePeriod.endDate.month

      let validDate
      if (this.timePeriod.weekly) {
        validDate = validYear && validWeek
      } else {
        validDate = validYear && validMonth
      }

      // Validate selection
      let validSelection = true
      if (this.selected.tab === 1) {
        validSelection = this.selected.products.length >= 1
      }

      // Return
      return validDate && validSelection
    }
  },
  mounted () {
    setTimeout(async () => { await this.fetchProducts() }, 200)
  },
  methods: {
    generateReport () {
      let selected
      switch (this.selected.tab) {
        case 0:
          // All
          selected = { type: 'all' }
          break

        case 1:
          // Individual items
          selected = { type: 'products', products: this.selected.products }
          break

        case 2:
          // Categories
          selected = { type: 'categories', categories: this.selected.categories }
          break
      }

      this.$emit('request-sent', { timePeriod: this.timePeriod, selected })
    },
    toggleItem (name) {
      const index = this.selected.products.findIndex(item => (item.name === name))
      if (index > -1) {
        this.selected.products.splice(index, 1)
      } else {
        this.selected.products.push({ name })
      }
    },
    toggleCategorySelection (name) {
      const index = this.selected.categories.findIndex(cat => (cat.name === name))
      if (index > -1) {
        this.selected.categories.splice(index, 1)
      } else {
        this.selected.categories.push({ name })
      }
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
