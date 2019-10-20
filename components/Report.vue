<template>
  <div>
    <!-- <graph :products="graphdata" weekly start-date="2015-07-01" end-date="2015-12-01" />
    <graph :products="graphdata" monthly start-date="2015-07-01" end-date="2015-12-01" /> -->
    <b-button @click="debugStuff()">
      Debug
    </b-button>
  </div>
</template>

<script>
import Moment from 'moment'
import { extendMoment } from 'moment-range'
// import Graph from '~/components/Graph.vue'
import FETCH_TRANSACTIONS from '~/graphql/sale/FETCH_TRANSACTIONS.gql'

const moment = extendMoment(Moment)

export default {
  // components: {
  //   Graph
  // },
  props: {
    dateRange: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    graphdata: [{ name: 'Product 1', data: [40, 20, 10, 30, 20, 2, 3, 40, 12] }],
    transactionsRawData: []
  }),
  computed: {
    transactionsInRange () {
      return this.transactionsRawData.filter(t => moment(Number(t.createdAt)).within(this.dateRange.range))
    },
    transactionsByMonth () {
      return this.dateRange.dates.map(d => ({ date: d, transactions: this.transactionsInMonth(d) }))
    }
  },
  mounted () {
    setTimeout(async () => { await this.fetchTransactions() }, 200)
  },
  methods: {
    transactionsInMonth (month) {
      const range = moment.rangeFromInterval('month', 1, month)
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
    },
    debugStuff () {
      console.log(this.transactionsByMonth)
      console.log(this.dateRange)
    }
  }
}
</script>
