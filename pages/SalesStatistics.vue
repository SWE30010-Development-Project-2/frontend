<template>
  <div>
    <navbar title="Home" />
    <div class="container">
      <b-row class="pt-5 pb-3">
        <b-col>
          <h1 class="display-4 text-center">
            Sales Statistics
          </h1>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col>
          <h2>Select Items</h2>
          <b-card no-body>
            <b-tabs card>
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
                        <b-form-input v-model="search" :type="search" placeholder="Search Products or Enter Barcode" />
                      </b-col>
                    </b-form-row>
                    <b-row>
                      <b-col v-for="product in filteredProducts" :key="product.name" cols="2">
                        <product
                          small
                          :ticked="items.filter(item => item.name == product.name).length > 0 "
                          :name="product.name"
                          :img-src="product.img"
                          :barcode="product.barcode"
                          @click="toggleItem(product.name)"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="4">
                    <h4>Selected Items</h4>
                    <b-list-group>
                      <searched-item v-for="(item, index) in items" :key="index" :name="item.name" img="/images/paracetamol.jpg" @deleteItem="items.splice(index, 1)" />
                    </b-list-group>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Item Categories">
                <b-row>
                  <b-col cols="8">
                    <h4>Choose Catagories/Groups of Items for the Report</h4>
                    <b-form-row class="pt-0 pb-3">
                      <b-col>
                        <b-form-input v-model="search" :type="search" placeholder="Search Categories" />
                      </b-col>
                    </b-form-row>
                    <b-row>
                      <b-col v-for="product in filteredProducts" :key="product.name" cols="2">
                        <product
                          small
                          :ticked="items.filter(item => item.name == product.name).length > 0 "
                          :name="product.name"
                          :img-src="product.img"
                          :barcode="product.barcode"
                          @click="toggleItem(product.name)"
                        />
                      </b-col>
                    </b-row>
                  </b-col>
                  <b-col cols="4">
                    <h4>Selected Categories</h4>
                    <b-list-group>
                      <searched-item v-for="(item, index) in items" :key="index" :name="item.name" img="/images/paracetamol.jpg" @deleteItem="items.splice(index, 1)" />
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
      <b-row>
        <b-col class="text-right">
          <b-button variant="primary" @click="generateReport()">
            Generate Report
          </b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import SearchedItem from '~/components/SearchedItem.vue'
import SelectMonth from '~/components/SelectMonth.vue'
import SelectYear from '~/components/SelectYear.vue'
import SelectWeek from '~/components/SelectWeek.vue'
import ToggleControl from '~/components/ToggleControl.vue'
import Product from '~/components/Product.vue'

export default {
  components: {
    Navbar, SearchedItem, SelectMonth, SelectYear, SelectWeek, ToggleControl, Product
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
      products: [
        { name: 'Paracetamol', img: '/images/paracetamol.jpg', barcode: '931001244534' },
        { name: 'Sambucol', img: '/images/sambucol.jpg', barcode: '124499953403' },
        { name: 'Xanax', img: '/images/xanax.jpg', barcode: '124454444333' },
        { name: 'Glucophage', img: '/images/placeholder.jpg', barcode: '454943112345' },
        { name: 'Amoxil', img: '/images/placeholder.jpg', barcode: '000000000112' },
        { name: 'Lipitor', img: '/images/placeholder.jpg', barcode: '000333300112' },
        { name: 'Zofran', img: '/images/placeholder.jpg', barcode: '069693808812' },
        { name: 'Panadol', img: '/images/placeholder.jpg', barcode: '777788880000' },
        { name: 'Vicodin', img: '/images/placeholder.jpg', barcode: '555500226688' },
        { name: 'Neurontin', img: '/images/placeholder.jpg', barcode: '556600225656' }
      ],
      items: [],
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
  methods: {
    generateReport () {
      console.log(this.timePeriod)
    },
    toggleItem (name) {
      const index = this.items.findIndex(item => (item.name === name))
      if (index > -1) {
        this.items.splice(index, 1)
      } else {
        this.items.push({ name })
      }
    }
  }

}
</script>

<style lang="scss">
h1, h2 {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.big-icon {
  font-size: 4rem;
}
</style>
