<script>
import { Line } from 'vue-chartjs'
import Formatting from '~/assets/formatting.js'

export default {
  extends: Line,
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            // Include a dollar sign in the ticks
            callback (value, index, values) {
              return '$' + value
            }
          }
        }]
      }
    },
    colour: '#007bff'
  }),
  computed: {
    chartdata () {
      const labels = this.data.dates.map(d => this.formatAsDate(d.date))
      const datasets = [{
        label: 'All Products',
        backgroundColor: this.colour + '3F',
        borderColor: this.colour,
        data: this.data.dates.map(d => d.price)
      }]

      return { labels, datasets }
    }
  },
  watch: {
    chartdata (data) {
      this.renderChart(data, this.options)
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  },
  methods: {
    ...Formatting
  }
}
</script>
