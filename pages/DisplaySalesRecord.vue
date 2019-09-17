<template>
  <div>
    <navbar title="Add Sales Record Page" />
    <div class="links">
      <a
        href=""
        target="_blank"
        class="button--green"
      >
        Today
      </a>
      <a
        href=""
        target="_blank"
        class="button--grey"
      >
        Past Week
      </a>
      <a
        href=""
        target="_blank"
        class="button--grey"
      >
        Past year
      </a>
      <div id="employee-table">
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Sale Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Xanax</td>
              <td>5</td>
            </tr>
            <tr>
              <td>paracetamol</td>
              <td>500</td>
            </tr>
            <tr>
              <td>Sambucol</td>
              <td>40</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.links {
  padding-top: 15px;
   justify-content: center;
  align-items: center;
  text-align: center;
}
.table {
    align-items: center;
    text-align: center;
    justify-content: center;
}
</style>
