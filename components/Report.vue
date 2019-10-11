<template>
  <div>
    <graph :products="graphdata" weekly start-date="2015-07-01" end-date="2015-12-01" />
    <graph :products="graphdata" monthly start-date="2015-07-01" end-date="2015-12-01" />
  </div>
</template>

<script>
import Graph from '~/components/Graph.vue'

export default {
  components: {
    Graph
  },
  data: () => ({
    graphdata: [{ name: 'Product 1', data: [40, 20, 10, 30, 20, 2, 3, 40, 12] }]
  })
}
</script>
