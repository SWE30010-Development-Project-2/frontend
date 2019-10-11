<template>
  <div>
    <b-button @click="init()">
      Init the database
    </b-button>
  </div>
</template>
<script>
import INIT from '~/graphql/product/INIT.gql'
export default {
  methods: {
    async init () {
      await this.$apollo
        .mutate({
          mutation: INIT
          // variables: {

          // }
        })
    }
  }
}
</script>
