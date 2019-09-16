<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">
      {{ title }}
    </b-navbar-brand>
    <b-navbar-nav class="justify-content-start">
      <b-nav-item href="#">
        Links
      </b-nav-item>
      <b-nav-item href="#">
        Links
      </b-nav-item>
      <b-nav-item href="#">
        Links
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
module.exports = {
  props: ['title']
}
</script>
