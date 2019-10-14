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
      <b-nav-item href="/login">
        Login
      </b-nav-item>
      <b-nav-item href="/salesstatistics">
        Sales Statistics
      </b-nav-item>

      <!--<b-nav-item :href="'/user/' + user.username">-->
          <!--{{ user.username }}-->
          <!--<img height="30px" :src="user.avatar" />-->
      <!--</b-nav-item>-->
    </b-navbar-nav>
      <span v-show="user != null" style="color: #ffffff; margin-left: 30%">
        {{ user.username }}
        <img height="32px" style="border-radius: 5px" :src="user.avatar" />
      </span>
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
  }
}
</script>
