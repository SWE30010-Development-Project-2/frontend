<template>
  <div>
    <navbar title="Debug Page" />
    <div>
      <b-button @click="addProducts()">
        Add Products
      </b-button>
      <b-button @click="addSales()">
        Add Some Sample Sales Records
      </b-button>
      <b-button @click="addUser()">
        Add User - User: admin, email: admin@mail.com, PWD: 1234
      </b-button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ADD_PRODUCT from '~/graphql/product/ADD_PRODUCT.gql'
import ADD_USER from '~/graphql/user/ADD_USER.gql'
import ADD_TRANSACTION from '~/graphql/sale/ADD_TRANSACTION.gql'
import Navbar from '~/components/Navbar.vue'
import FETCHPRODUCTS from '~/graphql/product/FETCHPRODUCTS.gql'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      products: [
        { name: 'Paracetamol', barcode: '931001244534', price: 6.00, description: 'Cheap Panadol' },
        { name: 'Sambucol', barcode: '124499953403', price: 3.00, description: 'Medicine of some type' },
        { name: 'Xanax', barcode: '124454444333', price: 20.00, description: 'Some medicine' },
        { name: 'Glucophage', barcode: '454943112345', price: 20.00, description: 'Medicine of some type' },
        { name: 'Amoxil', barcode: '000000000112', price: 40.00, description: 'Medicine of some type' },
        { name: 'Lipitor', barcode: '000333300112', price: 30.00, description: 'Medicine of some type' },
        { name: 'Zofran', barcode: '069693808812', price: 2.00, description: 'Medicine of some type' },
        { name: 'Panadol', barcode: '777788880000', price: 8.50, description: 'Paracetemol' },
        { name: 'Neurontin', barcode: '556600225656', price: 12.50, description: 'Medicine of some type' }
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    async addProducts () {
      for (const product of this.products) {
        await this.$apollo.mutate({
          mutation: ADD_PRODUCT,
          variables: {
            name: product.name,
            barcode: product.barcode,
            price: product.price,
            description: product.description
          }
        })
      }
    },
    async addSales () {
      let products = []

      await this.$apollo
        .query({
          query: FETCHPRODUCTS
        })
        .then(({ data }) => {
          products = data.products
        })

      await this.$apollo.mutate({
        mutation: ADD_TRANSACTION,
        variables: {
          products: products.map(product => product.id),
          employee: this.user.id
        }
      })
    },
    async addUser () {
      await this.$apollo.mutate({
        mutation: ADD_USER,
        variables: {
          username: 'admin',
          email: 'admin@mail.com',
          password: '1234'
        }
      })
    }
  }
}

</script>
