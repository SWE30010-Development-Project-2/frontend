<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
    <b-navbar-brand href="#">
      {{ title }}
    </b-navbar-brand>
    <b-navbar-nav class="justify-content-start">
      <b-nav-item href="/">
        Home
      </b-nav-item>
      <b-nav-item href="/addsalesrecord">
        Add Sales Record
      </b-nav-item>
      <b-nav-item href="/displaysalesrecords">
        Display Sales Records
      </b-nav-item>
      <b-nav-item href="/displaystock">
        Display Stock
      </b-nav-item>
      <b-nav-item href="/salesstatistics">
        Sales Statistics
      </b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <b-nav-item v-if="user != null" @click="logout()">
        {{ user.username }}
        <b-img
          rounded
          height="32px"
          :src="user.avatar"
          :alt="user.username"
        />
      </b-nav-item>
      <b-nav-item v-else href="/login">
        Login
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<style lang="scss" scoped>
.navbar {
  height: 3.5rem;
}
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    title: {
      type: String,
      default: null,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    logout () {
      this.$store.commit('auth/LOGOUT')
      this.$router.push('/login')
    }
  }
}
</script>
