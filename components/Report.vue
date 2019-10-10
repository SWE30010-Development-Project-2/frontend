<template>
  <div>
    <p>Placeholder</p>
    <graph :chartdata="chartdata" :options="options" />
  </div>
</template>

<script>
import Graph from '~/components/Graph.vue'

export default {
  components: {
    Graph
  },
  data: () => ({
    chartdata: {
      labels: ['January', 'February', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#3b80703F', // 25% transparency
          borderColor: '#3b8070',
          data: [40, 20, 10, 30, 20, 2, 3, 40, 12]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  })
}
</script>
