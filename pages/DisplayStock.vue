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
    <navbar title="Display Stock" />
    <time-selection-buttons @today="filterByDate('today')" @week="filterByDate('week')" @month="filterByDate('month')" @year="filterByDate('year')" />

    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col lg="6" class="my-1">
          <sort-control :sort-value="{sortBy, sortDesc}" :sort-options="sortOptions" @input="sortBy = $event.sortBy; sortDesc=$event.sortDesc" />
        </b-col>

        <b-col lg="6" class="my-1">
          <filter-control :filter="filter" @input="filter = $event" />
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
          <b-button size="sm" class="mr-1" @click="info(row.item, row.index, $event.target)">
            Edit
          </b-button>
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
    </b-container>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import TimeSelectionButtons from '~/components/TimeSelectionButtons.vue'
import SortControl from '~/components/SortControl.vue'
import FilterControl from '~/components/FilterControl.vue'

export default {
  components: {
    Navbar, TimeSelectionButtons, SortControl, FilterControl
  },
  data () {
    return {
      items: [
        { sales: 40, name: 'Xanax' },
        { sales: 21, name: 'Cocaine' },
        { sales: 9, name: 'Glucophage' },
        { sales: 89, name: 'GHB' },
        { sales: 38, name: 'Vicodin' },
        { sales: 27, name: 'Lipitor' },
        { sales: 40, name: 'Zofran' },
        { sales: 87, name: 'Panadol' },
        { sales: 26, name: 'Amoxil' },
        { sales: 22, name: 'Delasone' },
        { sales: 38, name: 'Neurontin' },
        { sales: 29, name: 'Prinivil' }
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
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/psaless due to filtering
      this.totalRows = filteredItems.length
      this.currentPsales = 1
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
