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
    </div>
    <div id="table">
      <input id="Input" type="text" onkeyup="myFunction()" placeholder="Search for names..">
      <b-table striped :items="items" :fields="fields">
        <b-table-column custom-key="actions">
          <button class="button is-small is-light" @click="edit(props.row)">
            <b-icon icon="edit" size="is-small" />
          </button>
        </b-table-column>
      </b-table>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      // changes how the fields of the tables interact
      fields: [
        {
          key: 'Product_Name',
          sortable: true
        },
        {
          key: 'Sales_No',
          sortable: false
        },
        {
          key: 'actions',
          sortable: false
        }
      ],
      // contents of the table am not sure how to add edit button into this
      items: [
        { Product_Name: 'Xanax', Sales_No: '6' },
        { Product_Name: 'Paracetemol', Sales_No: '6', Edit: 'OOF' },
        { Product_Name: 'Dug9', Sales_No: '6', Edit: 'OOF' },
        { Product_Name: 'Drug7', Sales_No: '6', Edit: 'OOF' }
      ]
    }
  }
}
</script>

<style>
#Input {
    background-image: url('/css/searchicon.png'); /* Add a search icon to input */
  background-position: 10px 12px; /* Position the search icon */
  background-repeat: no-repeat; /* Do not repeat the icon image */
  width: 50%; /* Full-width */
  font-size: 16px; /* Increase font-size */
  padding: 12px 20px 12px 40px; /* Add some padding */
  border: 1px solid #ddd; /* Add a grey border */
  margin-bottom: 12px; /* Add some space below the input */

}
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
   margin-bottom: 12px; /* Add some space below the input */
}
.table {
    border-collapse: collapse; /* Collapse borders */
  border: 1px solid #ddd; /* Add a grey border */
    align-items: center;
    text-align: center;
    justify-content: center;
}
</style>
