<template>
  <div>
    <!-- <navbar title="Add Sales Record Page" /> -->
    <b-container>
      <div class="card" style="width: 18rem;">
        <img src="/images/logo.png" class="card-img-top" alt="PHP LOGO">
        <div class="card-body">
          <b-card title="Login">
            <b-form-group id="user_id_group" label="User ID: " label-for="user_id">
              <b-form-input
                id="user_id"
                required
                placeholder="Enter User ID"
              />
            </b-form-group>
            <b-form-group id="password_group" label="Password: " label-for="password">
              <b-form-input
                id="password"
                required
                placeholder="Enter Password"
              />
            </b-form-group>

            <b-button type="submit" variant="outline-primary">
              Login
            </b-button>
            <b-button type="reset" variant="danger">
              Reset
            </b-button>
          </b-card>
        </div>
      </div>
    </b-container>
  </div>
</template>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
}
.card {
        margin: 0 auto; /* Added */
        float: none; /* Added */
        margin-bottom: 10px; /* Added */
        border: none;
}
</style>

<script>
// import Navbar from '~/components/Navbar.vue'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faBandAid } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// library.add(faBandAid)

export default {
  components: {
    // FontAwesomeIcon
  //   Navbar
  },
  layout: 'default'
}
</script>
