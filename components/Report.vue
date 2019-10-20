<template>
  <div>
    <!-- <graph :products="graphdata" weekly start-date="2015-07-01" end-date="2015-12-01" />
    <graph :products="graphdata" monthly start-date="2015-07-01" end-date="2015-12-01" /> -->
    <b-button @click="debugStuff()">
      Debug
    </b-button>

    <b-row v-for="(product, index) in statisticsAggregatedByProduct" :key="index" class="mb-4">
      <b-col>
        <h2>{{ product.name }}</h2>
        <b-table
          show-empty
          small
          stacked="md"
          :items="product.dates"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
        >
          <template v-slot:cell(price)="row">
            {{ formatAsPrice(row.value) }}
          </template>

          <template v-slot:cell(date)="row">
            {{ formatAsDate(row.value) }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Moment from 'moment'
import { extendMoment } from 'moment-range'
// import Graph from '~/components/Graph.vue'
import FETCH_TRANSACTIONS from '~/graphql/sale/FETCH_TRANSACTIONS.gql'
import Formatting from '~/assets/formatting.js'

const moment = extendMoment(Moment)

export default {
  // components: {
  //   Graph
  // },
  props: {
    dateRange: {
      type: Object,
      required: true
    },
    products: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    graphdata: [{ name: 'Product 1', data: [40, 20, 10, 30, 20, 2, 3, 40, 12] }],
    transactionsRawData: [],
    sortBy: 'date',
    sortDesc: false
  }),
  computed: {
    fields () {
      return [
        { key: 'date', label: (this.dateRange.weekly) ? 'Week Starting' : 'Month Starting', sortable: false },
        { key: 'noItems', label: 'Total Sales (number sold)', sortable: true, sortDirection: 'desc', class: 'text-center' },
        { key: 'price', label: 'Total Sales ($)', sortable: true, sortDirection: 'desc', class: 'text-center' }
      ]
    },
    transactionsInRange () { // Not needed anymore
      return this.transactionsRawData.filter(t => moment(Number(t.createdAt)).within(this.dateRange.range))
    },
    transactionsByMonth () {
      return this.dateRange.dates.map(d => ({ date: d, transactions: this.transactionsInInterval(d, 'month') }))
    },
    transactionsByWeek () {
      return this.dateRange.dates.map(d => ({ date: d, transactions: this.transactionsInInterval(d, 'isoWeek') }))
    },
    transactionsByProduct () {
      if (this.dateRange.weekly) {
        return this.products.map(p => ({ product: p, dates: this.transactionsOfProductWeekly(p) }))
      } else {
        return this.products.map(p => ({ product: p, dates: this.transactionsOfProductMonthly(p) }))
      }
    },
    statisticsAggregatedByProduct () {
      return this.transactionsByProduct.map(function (product) {
        const dates = product.dates.map(function (d) {
          // Number of individual sales
          let noItems = 0
          for (const t of d.transactions) {
            if (t.products != null) {
              noItems += t.products.length
            }
          }

          // Price
          let price = 0
          for (const t of d.transactions) {
            if (t.products != null) {
              for (const p of t.products) {
                price += p.price
              }
            }
          }

          return { date: d.date, noItems, price }
        })

        return { name: product.product.name, dates }
      })
    }
  },
  mounted () {
    setTimeout(async () => { await this.fetchTransactions() }, 200)
  },
  methods: {
    ...Formatting,
    transactionsInInterval (date, interval) {
      const range = moment.rangeFromInterval(interval, 1, date)
      return this.transactionsRawData.filter(t => moment(Number(t.createdAt)).within(range))
    },
    transactionsOfProductWeekly (product) {
      return this.transactionsByWeek.map(d => ({ date: d.date, transactions: d.transactions.map(t => ({ products: t.products.filter(p => p.name === product.name) })) }))
    },
    transactionsOfProductMonthly (product) {
      return this.transactionsByMonth.map(d => ({ date: d.date, transactions: d.transactions.map(t => ({ products: t.products.filter(p => p.name === product.name) })) }))
    },
    async fetchTransactions () {
      await this.$apollo
        .query({
          query: FETCH_TRANSACTIONS
        })
        .then(({ data }) => {
          this.transactionsRawData = data.transactions
        })
    },
    debugStuff () {
      console.log(this.transactionsByMonth)
      console.log(this.transactionsByProduct)
      console.log(this.dateRange)
      console.log(this.statisticsAggregatedByProduct)
    }
  }
}
</script>
