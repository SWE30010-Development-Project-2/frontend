<template>
  <div>
    <navbar title="Login Page" />
    <b-container class="mv-0">
      <div class="card" style="width: 18rem;">
        <img src="/images/logo.png" class="card-img-top" alt="PHP LOGO">
        <div class="card-body">
          <b-card title="Login">
            <b-form-group id="user_id_group" label="User ID: " label-for="user_id">
              <b-form-input
                id="user_id"
                type="text"
                required
                placeholder="Enter User ID"
              />
            </b-form-group>
            <b-form-group id="password_group" label="Password: " label-for="password">
              <b-form-input
                id="password"
                type="password"
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
  display: flex;
  align-items: center;
  min-height: 100vh;
}
.card {
        margin: 0 auto;
        float: none;
        margin-bottom: 10px;
        border: none;
}
</style>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  layout: 'default'
}
</script>
