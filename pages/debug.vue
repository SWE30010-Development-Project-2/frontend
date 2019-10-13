<template>
  <div>
    <b-button @click="init()">
      Init the database
    </b-button>
  </div>
</template>
<script>
import ADD_PRODUCT from '~/graphql/product/ADD_PRODUCT.gql'
export default {
  data () {
    return {
      products: [
        { name: 'Paracetamol', barcode: '931001244534', price: 6.00, description: 'A painkiller that is not prescription' },
        { name: 'Sambucol', barcode: '124499953403', price: 3.00 },
        { name: 'Xanax', barcode: '124454444333', price: 20.00 },
        { name: 'Glucophage', barcode: '454943112345', price: 20.00 },
        { name: 'Amoxil', barcode: '000000000112', price: 40.00 },
        { name: 'Lipitor', barcode: '000333300112', price: 30.00 },
        { name: 'Zofran', barcode: '069693808812', price: 2.00 },
        { name: 'Panadol', barcode: '777788880000', price: 8.50 },
        { name: 'Vicodin', barcode: '555500226688', price: 16.00 },
        { name: 'Neurontin', barcode: '556600225656', price: 12.50 }
      ]
    }
  },
  methods: {
    async init () {
      for (const product of this.products) {
        await this.$apollo.mutate({
          mutation: ADD_PRODUCT,
          variables: {
            name: product.name,
            barcode: product.barcode,
            price: product.price
          }
        })
      }
    }
  }
}

</script>
