<template>
  <div>
    <navbar title="Sales Statistics" />
    <div class="container">
      <template v-if="state==='form'">
        <b-row class="pt-5 pb-3">
          <b-col>
            <h1 class="display-4 text-center">
              Sales Statistics
            </h1>
          </b-col>
        </b-row>
        <request-sales-stats-form @request-sent="timePeriod = $event.timePeriod; selected = $event.selected; state='report'" />
      </template>
      <template v-else-if="state==='report'">
        <report-products v-if="selected.type === 'products'" :date-range="dateRange" :products="selected.products" />
        <report-all v-if="selected.type === 'all'" :date-range="dateRange" />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Moment from 'moment'
import { extendMoment } from 'moment-range'
import Navbar from '~/components/Navbar.vue'
import RequestSalesStatsForm from '~/components/RequestSalesStatsForm.vue'
import ReportProducts from '~/components/ReportProducts.vue'
import ReportAll from '~/components/ReportAll.vue'

const moment = extendMoment(Moment)

export default {
  components: {
    Navbar, RequestSalesStatsForm, ReportProducts, ReportAll
  },
  data () {
    return {
      state: 'form',
      timePeriod: {},
      selected: {}
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    }),
    dateRange () {
      if (this.timePeriod.weekly) {
        // Weekly
        const startDate = moment().set({ 'year': this.timePeriod.startDate.year, 'week': this.timePeriod.startDate.week }).startOf('isoWeek')
        const endDate = moment().set({ 'year': this.timePeriod.endDate.year, 'week': this.timePeriod.endDate.week }).endOf('isoWeek')
        const range = moment.range(startDate, endDate)
        const dates = Array.from(range.by('week', { excludeEnd: false }))
        return { weekly: true, startDate, endDate, range, dates }
      } else {
        // Monthly
        const startDate = moment().set({ 'year': this.timePeriod.startDate.year, 'month': this.timePeriod.startDate.month }).startOf('month')
        const endDate = moment().set({ 'year': this.timePeriod.endDate.year, 'month': this.timePeriod.endDate.month }).endOf('month')
        const range = moment.range(startDate, endDate)
        const dates = Array.from(range.by('month', { excludeEnd: false }))
        return { monthly: true, startDate, endDate, range, dates }
      }
    }
  },
  mounted () {
    setTimeout(async () => { await this.fetchProducts() }, 200)
    if (this.user === null) {
      this.$router.push('/login')
    }
  }
}
</script>
