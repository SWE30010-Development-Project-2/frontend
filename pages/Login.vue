<template>
  <div>
    <navbar title="Login" />
    <b-container ref="loginContainer" class="mv-0">
      <div class="card" style="width: 18rem;">
        <img src="/images/logo.png" class="card-img-top" alt="PHP LOGO"></img>

        <div class="card-body">
          <b-card title="Login">
            <b-alert v-show="errors.length > 0" show variant="danger">
              <span v-for="error in errors" :key="error.message">
                {{ error.message }}
              </span>
            </b-alert>

            <b-form-group
              label="Email: "
              label-for="user_id"
            >
              <b-form-input
                v-model="email"
                type="text"
                required
                placeholder="Enter Email"
              />
            </b-form-group>
            <b-form-group label="Password: " label-for="password">
              <b-form-input
                v-model="password"
                type="password"
                required
                placeholder="Enter Password"
              />
            </b-form-group>

            <b-button type="button" variant="outline-primary" @click="login()">
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
<script>
import Navbar from '~/components/Navbar.vue'
import AUTHENTICATE from '~/graphql/user/AUTHENTICATE'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      loading: false,
      email: null,
      password: null,
      errors: []
    }
  },
  methods: {
    async login () {
      this.errors = []

      const loading = this.$loading.show({
        container: this.$refs.loginContainer
      })

      await this.$apollo
        .query({
          query: AUTHENTICATE,
          variables: {
            email: this.email,
            password: this.password
          }
        })
        .then(({ data }) => {
          this.$apolloHelpers.onLogin(data.authenticate.token)
          this.$router.push('/')
          loading.hide()
        })
        .catch((error) => {
          this.errors = error.graphQLErrors.map(error => error)
          loading.hide()
        })
    }
  }
}
</script>
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
