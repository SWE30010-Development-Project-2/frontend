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
    </b-navbar-nav>
  </b-navbar>
</template>

<style lang="scss" scoped>
.navbar {
  height: 3.5rem;
}
</style>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null,
      required: true
    }
  }
}
</script>
