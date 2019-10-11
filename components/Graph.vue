<script>
import { Line } from 'vue-chartjs'
import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)

export default {
  extends: Line,
  props: {
    products: {
      type: Array,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    weekly: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),
  computed: {
    chartdata () {
      return {
        labels: listDaysInRange(this.startDate, this.endDate, this.weekly),
        datasets: [
          {
            label: this.products[0].name,
            backgroundColor: '#3b80703F', // 25% transparency
            borderColor: '#3b8070',
            data: this.products[0].data
          }
        ]
      }
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}

const listDaysInRange = function (startDate, endDate, weekly) {
  if (weekly) {
    // Weekly
    const sDate = moment(startDate).startOf('week')
    const eDate = moment(endDate).startOf('week')
    const range = moment.range(sDate, eDate)

    const dates = Array.from(range.by('week', { excludeEnd: false }))
    return dates.map(m => m.format('DD/MM/YYYY'))
  } else {
    // Monthly
    const sDate = moment(startDate).startOf('month')
    const eDate = moment(endDate).startOf('month')
    const range = moment.range(sDate, eDate)

    const dates = Array.from(range.by('month', { excludeEnd: false }))
    return dates.map(m => m.format('MMM YYYY'))
  }
}
</script>
