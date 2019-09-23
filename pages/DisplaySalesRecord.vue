<script src="https://unpkg.com/vue@2.5.17/dist/vue.min.js"></script>
<script src="https://unpkg.com/babel-polyfill@latest/dist/polyfill.min.js"></script>
<script src="https://unpkg.com/bootstrap-vue@latest/dist/bootstrap-vue.js"></script>

<template>
  <div>
    <navbar title="Add Sales Record Psales" />
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

    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Sort"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="sortBySelect"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-select id="sortBySelect" v-model="sortBy" :options="sortOptions" class="w-75">
                <template v-slot:first>
                  <option value="">
                    -- none --
                  </option>
                </template>
              </b-form-select>
              <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
                <option :value="false">
                  Asc
                </option>
                <option :value="true">
                  Desc
                </option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filterInput"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              />
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">
                  Clear
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per psales"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPsalesSelect"
            class="mb-0"
          >
            <b-form-select
              id="perPsalesSelect"
              v-model="perPsales"
              size="sm"
              :options="psalesOptions"
            />
          </b-form-group>
        </b-col>

        <b-col sm="7" md="6" class="my-1">
          <b-pagination
            v-model="currentPsales"
            :total-rows="totalRows"
            :per-psales="perPsales"
            align="fill"
            size="sm"
            class="my-0"
          />
        </b-col>
      </b-row>

      <!-- Main table element -->
      <b-table
        show-empty
        small
        stacked="md"
        :items="items"
        :fields="fields"
        :current-psales="currentPsales"
        :per-psales="perPsales"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <template v-slot:cell(actions)="row">
          <b-button size="sm" class="mr-1" @click="info(row.item, row.item.sales, $event.target)">
            Edit
          </b-button>
          <b-button size="sm" @click="row.toggleDetails">
            Delete
          </b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </b-card>
        </template>
      </b-table>

      <!-- Info modal -->
      <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <pre>{{ infoModal.content }}</pre>
        <!-- <b-row class="pb-1 pt-1 align-items-center">
          <b-col cols="4">
            {{ sales }} x {{ name }}
          </b-col>
          <b-col cols="4">
            <number v-model="sales" @input="$emit('update-qty',sales)" />
          </b-col>
          <b-col cols="4" class="text-right">
            <b-button variant="outline-danger" class="w-100 text-nowrap" @click="$emit('deleteItem',index)">
              <font-awesome-icon icon="trash-alt" /> Remove
            </b-button>
          </b-col>
        </b-row>   -->
      </b-modal>
    </b-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {  sales: 40, name: 'Xanax' },
          {  sales: 21, name: 'Cocaine' },
          { sales: 9,name: 'Glucophage'},
          {  sales: 89, name: 'GHB' },
          {  sales: 38, name: 'Vicodin' },
          {  sales: 27, name: 'Lipitor' },
          {  sales: 40, name: 'Zofran' },
          {sales: 87,name: 'Panadol' },
          {  sales: 26, name: 'Amoxil' },
          {  sales: 22, name: 'Delasone' },
          {  sales: 38, name: 'Neurontin' },
          {  sales: 29, name: 'Prinivil' }
        ],
        fields: [
          { key: 'name', label: 'Product Name', sortable: true, sortDirection: 'desc' },
          { key: 'sales', label: 'Sales No', sortable: true, class: 'text-center' },
          { key: 'actions', label: 'Actions' }
        ],
        totalRows: 1,
        currentPsales: 1,
        perPsales: 5,
        psalesOptions: [5, 10, 15],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      info(item, index, button) {
        this.infoModal.title = `Sale Number: ${index}`
        this.infoModal.content = JSON.stringify(item, null, 2)
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/psaless due to filtering
        this.totalRows = filteredItems.length
        this.currentPsales = 1
      }

    }
  }
</script>

<style>
#Input {
    background-imsales: url('/css/searchicon.png'); /* Add a search icon to input */
  background-position: 10px 12px; /* Position the search icon */
  background-repeat: no-repeat; /* Do not repeat the icon imsales */
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
