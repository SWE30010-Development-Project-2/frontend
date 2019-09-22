<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">
      {{ title }}
    </b-navbar-brand>
    <b-navbar-nav class="justify-content-start">
      <b-nav-item href="/addsalesrecord">
        Add Sales Record
      </b-nav-item>
      <b-nav-item href="/displaysalesrecord">
        Display Sales Record
      </b-nav-item>
      <b-nav-item href="/displaystock">
        Display Stock
      </b-nav-item>
      <b-nav-item href="/editsales">
        Edit Sales
      </b-nav-item>
      <b-nav-item href="/loginpage">
        Login Page
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  props: ['title']
}
</script>
