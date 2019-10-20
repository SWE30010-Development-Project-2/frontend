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
      maintainAspectRatio: false
    },
    colours: [
      '#3b8070',
      '#007bff',
      '#28a745',
      '#ffc107',
      '#dc3545',
      '#17a2b8',
      '#563d7c'
    ]
  }),
  computed: {
    chartdata () {
      const labels = this.data[0].dates.map(d => this.formatAsDate(d.date))
      const datasets = this.data.map((product, index) => ({
        label: product.name,
        backgroundColor: this.colours[index] + '3F',
        borderColor: this.colours[index],
        data: product.dates.map(d => d.price)
      }))

      return { labels, datasets }
    }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  },
  methods: {
    ...Formatting,
    stringToColour (str) {
      let hash = 0
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
      }
      let colour = '#'
      for (let j = 0; j < 3; j++) {
        const value = (hash >> (j * 8)) & 0xFF
        colour += ('00' + value.toString(16)).substr(-2)
      }
      return colour
    }
  }
}
</script>
