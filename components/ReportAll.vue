<template>
  <div>
    <b-row class="pt-5 pb-3 mb-4">
      <b-col>
        <h1 class="display-5">
          Sales report comparing the
          <template v-if="dateRange.weekly">
            weekly
          </template>
          <template v-else>
            monthly
          </template>
          sales of all products
          from {{ formatAsDate(dateRange.startDate) }}
          until {{ formatAsDate(dateRange.endDate) }}
        </h1>
      </b-col>
    </b-row>
    <b-row class="mb-4">
      <b-col>
        <h2 class="h3 display-6">
          Total sales per
          <template v-if="dateRange.weekly">
            week
          </template>
          <template v-else>
            month
          </template>
        </h2>
        <graph-all :data="{ dates: statisticsAggregated } " />
      </b-col>
    </b-row>

    <b-row class="mb-4">
      <b-col>
        <h3 class="h4 display-6">
          Statistics for all sales
        </h3>

        <b-table
          show-empty
          small
          stacked="md"
          :items="statisticsAggregated"
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
import GraphAll from '~/components/GraphAll.vue'
import FETCH_TRANSACTIONS from '~/graphql/sale/FETCH_TRANSACTIONS.gql'
import Formatting from '~/assets/formatting.js'

const moment = extendMoment(Moment)

export default {
  components: {
    GraphAll
  },
  props: {
    dateRange: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    transactionsRawData: [],
    sortBy: null,
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
    transactionsByInterval () {
      const interval = (this.dateRange.weekly) ? 'isoWeek' : 'month'
      return this.dateRange.dates.map(date => ({ date, transactions: this.transactionsInInterval(date, interval) }))
    },
    statisticsAggregated () {
      return this.transactionsByInterval.map(function (d) {
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
    async fetchTransactions () {
      await this.$apollo
        .query({
          query: FETCH_TRANSACTIONS
        })
        .then(({ data }) => {
          this.transactionsRawData = data.transactions
        })
    }
  }
}
</script>
