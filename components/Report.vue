<template>
  <div>
    <graph :products="graphdata" weekly start-date="2015-07-01" end-date="2015-12-01" />
    <graph :products="graphdata" monthly start-date="2015-07-01" end-date="2015-12-01" />
    <b-button @click="debugStuff()">
      Debug
    </b-button>
  </div>
</template>

<script>
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import Graph from '~/components/Graph.vue'
import FETCH_TRANSACTIONS from '~/graphql/sale/FETCH_TRANSACTIONS.gql'

const moment = extendMoment(Moment)

export default {
  components: {
    Graph
  },
  props: {
    timePeriod: {
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
      const startDate = moment('2019-01-01').startOf('day')
      const endDate = moment('2020-01-01').startOf('day')
      const dateRange = moment.range(startDate, endDate)

      return this.transactionsRawData.filter(t => moment(Number(t.createdAt)).within(dateRange))
    }
  },
  mounted () {
    setTimeout(async () => { await this.fetchTransactions() }, 200)
  },
  methods: {
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
      console.log(this.transactionsRawData)
      console.log(this.transactionsInRange)
      console.log(this.timePeriod)
    }
  }
}
</script>
