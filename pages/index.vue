<template>
  <div>
    <navbar title="Home" />
    <div class="container">
      <b-row class="pt-5 pb-5">
        <b-col>
          <h1 class="display-2 text-center">
            People's Health Pharmacy
          </h1>
          <h2 class="display-4 text-center">
            Sales Reporting and Prediction System
          </h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button href="/addsalesrecord" variant="outline-primary" class="w-100">
            <font-awesome-icon icon="plus" class="w-100 mt-4 mb-4 big-icon" />
            Add Sales Record
          </b-button>
        </b-col>
        <b-col>
          <b-button href="/displaysalesrecords" variant="outline-dark" class="w-100">
            <font-awesome-icon icon="receipt" class="w-100 mt-4 mb-4 big-icon" />
            Display Sales Records
          </b-button>
        </b-col>
        <b-col>
          <b-button href="/displaystock" variant="outline-primary" class="w-100">
            <font-awesome-icon icon="capsules" class="w-100 mt-4 mb-4 big-icon" />
            Display Stock
          </b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import { faPlus, faCapsules, faReceipt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import Navbar from '~/components/Navbar.vue'

library.add(faPlus)
library.add(faCapsules)
library.add(faReceipt)

export default {
  components: {
    Navbar, FontAwesomeIcon
  }
}
</script>

<style lang="scss">
.big-icon {
  font-size: 4rem;
}
</style>
