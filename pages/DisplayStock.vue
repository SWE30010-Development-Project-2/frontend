<template>
  <div>
    <!-- Modals -->
    <!-- Confirm Delete Modal -->
    <confirm-delete-modal
      id="confirm-delete-modal"
      :item="{ sales: confirmDeleteModal.item.sales, name: confirmDeleteModal.item.name}"
      :index="confirmDeleteModal.index"
      :item-property-labels="{ sales: 'Sales No', name: 'Product Name' }"
      @confirm-deletion="deleteRow(confirmDeleteModal.index)"
    />
    <!-- Edit Modal -->
    <edit-modal
      id="edit-modal"
      :item="{ sales: editModal.item.sales, name: editModal.item.name, description: editModal.item.description, price: editModal.item.price, barcode: editModal.item.barcode}"
      :index="editModal.index"
      :item-property-labels="{ sales: 'Sales No', name: 'Product Name', description: 'Description', price: 'Price', barcode: 'Barcode' }"
      @commitEdit="commitEdit($event,editModal.index)"
    />
    <!-- Info Modal -->
    <info-modal
      id="info-modal"
      :item="infoModal.item"
      :index="infoModal.index"
      :item-property-labels="{ name: 'Product Name', description: 'Description' }"
    />
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
        :items="products"
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
          <b-button size="sm" class="mr-1" @click="showInfo(row.item, row.index)">
            Info
          </b-button>
          <b-button size="sm" class="mr-1" @click="makeEdit(row.item, row.index)">
            Edit
          </b-button>
          <b-button size="sm" @click="confirmDeleteRow(row.item, row.index)">
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
import ConfirmDeleteModal from '~/components/ConfirmDeleteModal.vue'
import EditModal from '~/components/EditModal.vue'
import InfoModal from '~/components/InfoModal.vue'
import FETCHPRODUCTS from '~/graphql/product/FETCHPRODUCTS.gql'

export default {
  components: {
    Navbar, TimeSelectionButtons, SortControl, FilterControl, ConfirmDeleteModal, EditModal, InfoModal
  },
  data () {
    return {
      products: [],
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
      editModal: {
        index: null,
        item: { sales: 0, name: '' }
      },
      confirmDeleteModal: {
        index: null,
        item: { sales: 0, name: '' }
      },
      infoModal: {
        index: null,
        item: { name: '', info: '' }
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
  async mounted () {
    await this.fetchProducts()
    // Set the initial number of products
    this.totalRows = this.products.length
  },
  methods: {
    confirmDeleteRow (item, index) {
      this.confirmDeleteModal = { item, index }
      this.$bvModal.show('confirm-delete-modal')
    },
    deleteRow (index) {
      this.products.splice(index, 1)
      // TODO - send delete to server
    },
    commitEdit (newItem, index) {
      this.products[index] = { sales: newItem.sales, name: newItem.name }
      // TODO - update to server
    },
    makeEdit (item, index) {
      this.editModal = { item, index }
      this.$bvModal.show('edit-modal')
    },
    showInfo (item, index) {
      this.infoModal = { item, index }
      this.$bvModal.show('info-modal')
    },
    onFiltered (filteredProducts) {
      // Trigger pagination to update the number of buttons/psaless due to filtering
      this.totalRows = filteredProducts.length
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
    },
    async fetchProducts () {
      this.errors = []

      await this.$apollo
        .query({
          query: FETCHPRODUCTS
        })
        .then(({ data }) => {
          this.products = data.products
        })
        .catch((error) => {
          this.errors = error.graphQLErrors.map(error => error)
        })
    }

  }
}
</script>

<style lang="scss">
.container {
  min-height: 100vh;
}
.table {
    border-collapse: collapse;
  border: 1px solid #ddd;
    align-items: center;
    text-align: center;
    justify-content: center;
}
</style>
