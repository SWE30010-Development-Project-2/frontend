<template>
  <div>
    <!-- Modals -->
    <b-modal ref="confirm-delete" title="Confirm Delete">
      Are you sure you would like to delete this item?
      <div slot="modal-footer">
        <b-button variant="danger">
          Delete
        </b-button>
        <b-button variant="outline-dark" @click="$refs['confirm-delete'].hide()">
          Cancel
        </b-button>
      </div>
    </b-modal>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <template v-slot:default="{ hide }">
        <p>{{ infoModal.content[1] }}</p>
      </template>

      <pre>{{ infoModal.content }}</pre>
    </b-modal>

    <!-- Page -->
    <navbar title="Display Sales Record" />

    <time-selection-buttons @today="filterByDate('today')" @week="filterByDate('week')" @month="filterByDate('month')" @year="filterByDate('year')" />

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
          :today="today"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
        >
          <template v-slot:cell(price)="row">
            $ {{ row.value.cost }}
          </template>

          <template v-slot:cell(actions)="row">
            <b-button size="sm" class="mr-1" @click="info(row.item, row.item, $event.target)">
              Edit
            </b-button>
            <!-- <b-button size="sm" @click="row.toggleDetails"> -->
            <b-button size="sm" @click="$refs['confirm-delete'].show()">
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

        </b-table>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import TimeSelectionButtons from '~/components/TimeSelectionButtons.vue'

export default {
  components: {
    Navbar, TimeSelectionButtons
  },
  data () {
    return {
      items: [
        { TransactionNo: '1', price: { cost: 40 }, NoItems: 6, time: '23/09/2019 : 11:05' },
        { TransactionNo: '2', price: { cost: 40 }, NoItems: 4, time: '23/09/2019 : 12:06' },
        { TransactionNo: '3', price: { cost: 40 }, NoItems: 1, time: '23/09/2019 : 12:06' },
        { TransactionNo: '4', price: { cost: 40 }, NoItems: 1, time: '20/09/2019 : 12:06' },
        { TransactionNo: '5', price: { cost: 40 }, NoItems: 1, time: '20/09/2019 : 12:06' },
        { TransactionNo: '6', price: { cost: 40 }, NoItems: 7, time: '23/09/2019 : 12:06' },
        { TransactionNo: '7', price: { cost: 40 }, NoItems: 8, time: '21/09/2019 : 12:06' },
        { TransactionNo: '8', price: { cost: 40 }, NoItems: 99, time: '23/09/2019 : 12:06' },
        { TransactionNo: '9', price: { cost: 40 }, NoItems: 100, time: '23/09/2019 : 12:06' },
        { TransactionNo: '10', price: { cost: 40 }, NoItems: 5000, time: '22/09/2019 : 12:06' },
        { TransactionNo: '11', price: { cost: 40 }, NoItems: 69, time: '21/09/2019 : 12:06' },
        { TransactionNo: '12', price: { cost: 40 }, NoItems: 59, time: '21/09/2019 : 12:06' }
      ],
      fields: [
        { key: 'TransactionNo', label: 'Transaction Code' },
        { key: 'time', label: 'Time of Sale', sortable: true, class: 'text-center' },
        { key: 'NoItems', label: 'No of Items', sortable: true, sortDirection: 'desc' },
        { key: 'price', label: 'Cost of Sale', sortable: true, sortDirection: 'desc' },
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPprice: 1,
      perPprice: 5,
      ppriceOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      today: '',
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
        TransactionNo: '',
        money: '$'
      }
    }
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted () {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    info (item, index, button) {
      this.infoModal.title = item.TransactionNo
      this.infoModal.content = item
      this.infoModal.TransactionNo = item.TransactionNo
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pprices due to filtering
      this.totalRows = filteredItems.length
      this.currentPprice = 1
    },
    filterByDate (option) {
      // Get Date
      const today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0')
      const yyyy = today.getFullYear()

      // Do Filtering
      if (option === 'today') {
        this.filter = dd + '/' + mm + '/' + yyyy
      } else if (option === 'week') {
        // Do Something
      } else if (option === 'month') {
        this.filter = mm + '/' + yyyy
      } else if (option === 'year') {
        this.filter = yyyy
      }
    }

  }
}
</script>

<style>
#Input {
  background-position: 10px 12px; /* Position the search icon */
  background-repeat: no-repeat; /* Do not repeat the icon imprice */
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
.table {
    border-collapse: collapse; /* Collapse borders */
    border: 1px solid #ddd; /* Add a grey border */
    align-items: center;
    text-align: center;
    justify-content: center;
}
</style>
