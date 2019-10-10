<template>
  <div>
    <navbar title="Sales Statistics" />
    <div class="container">
      <b-row class="pt-5 pb-3">
        <b-col>
          <h1 class="display-4 text-center">
            Sales Statistics
          </h1>
        </b-col>
      </b-row>
      <request-sales-stats-form v-if="state==='form'" @request-sent="state='loading-report'; sleep(500).then(() => {state='report'})" />
      <loading-report v-else-if="state==='loading-report'" />
      <report v-else-if="state==='report'" />
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import RequestSalesStatsForm from '~/components/RequestSalesStatsForm.vue'
import LoadingReport from '~/components/LoadingReport.vue'
import Report from '~/components/Report.vue'

export default {
  components: {
    Navbar, RequestSalesStatsForm, LoadingReport, Report
  },
  data () {
    return {
      state: 'form'
    }
  },
  methods: {
    sleep (time) {
      return new Promise(resolve => setTimeout(resolve, time))
    }
  }
}
</script>
