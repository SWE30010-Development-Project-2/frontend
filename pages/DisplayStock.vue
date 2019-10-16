<template>
  <div>
    <!-- Modals -->
    <!-- Confirm Delete Modal -->
    <confirm-delete-modal
      id="confirm-delete-modal"
      :item="{ name: confirmDeleteModal.item.name}"
      :index="confirmDeleteModal.index"
      :item-property-labels="{ name: 'Product Name' }"
      @confirm-deletion="deleteRow(confirmDeleteModal.item.id)"
    />
    <!-- Edit Modal -->
    <edit-modal
      id="edit-modal"
      :item="{ name: editModal.item.name, description: editModal.item.description, price: editModal.item.price, barcode: editModal.item.barcode}"
      :index="editModal.index"
      :item-property-labels="{ name: 'Product Name', description: 'Description', price: 'Price', barcode: 'Barcode' }"
      @commitEdit="commitEdit(editModal.item.id, $event)"
    />
    <!-- Info Modal -->
    <product-info-modal :product="infoModal.item" />

    <!-- Page -->
    <navbar title="Display Stock" />

    <b-container fluid>
      <!-- User Interface controls -->
      <b-row class="mt-3 mb-3">
        <b-col>
          <time-selection-buttons @today="filterByDate('today')" @week="filterByDate('week')" @month="filterByDate('month')" @year="filterByDate('year')" />
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6" class="my-1">
          <sort-control :sort-value="{sortBy, sortDesc}" :sort-options="sortOptions" @input="sortBy = $event.sortBy; sortDesc=$event.sortDesc" />
        </b-col>

        <b-col lg="6" class="my-1">
          <filter-control :filter="filter" @input="filter = $event" />
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
        <template v-slot:cell(price)="row">
          {{ formatAsPrice(row.value) }}
        </template>

        <template v-slot:cell(actions)="row">
          <b-button variant="info" size="sm" class="mr-1" @click="showInfo(row.item, row.index)">
            Info
          </b-button>
          <b-button variant="primary" size="sm" class="mr-1" @click="makeEdit(row.item, row.index)">
            Edit
          </b-button>
          <b-button variant="danger" size="sm" @click="confirmDeleteRow(row.item, row.index)">
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
import ProductInfoModal from '~/components/ProductInfoModal.vue'
import FETCHPRODUCTS from '~/graphql/product/FETCHPRODUCTS.gql'
import REMOVE_PRODUCT from '~/graphql/product/REMOVE_PRODUCT.gql'
import UPDATE_PRODUCT from '~/graphql/product/UPDATE_PRODUCT.gql'
import Formatting from '~/assets/formatting.js'

export default {
  components: {
    Navbar, TimeSelectionButtons, SortControl, FilterControl, ConfirmDeleteModal, EditModal, ProductInfoModal
  },
  data () {
    return {
      products: [],
      fields: [
        { key: 'name', label: 'Product Name', sortable: true, sortDirection: 'desc' },
        { key: 'price', label: 'Price', sortable: true, class: 'text-center' },
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
        item: { }
      },
      confirmDeleteModal: {
        index: null,
        item: { }
      },
      infoModal: {
        index: null,
        item: { }
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
    setTimeout(async () => { await this.fetchProducts() }, 200)
  },
  methods: {
    ...Formatting,
    confirmDeleteRow (item, index) {
      this.confirmDeleteModal = { item, index }
      this.$bvModal.show('confirm-delete-modal')
    },
    async deleteRow (id) {
      // Remove locally
      this.products = this.products.filter(product => product.id !== id)

      // Remove from server
      await this.$apollo.mutate({
        mutation: REMOVE_PRODUCT,
        variables: { id }
      })
    },
    async commitEdit (id, newProduct) {
      // Update locally
      this.products = this.products.filter(product => product.id !== id)
      newProduct.price = Number(newProduct.price)
      this.products.push({ id, ...newProduct })

      // Update to server
      await this.$apollo.mutate({
        mutation: UPDATE_PRODUCT,
        variables: {
          id,
          name: newProduct.name,
          description: newProduct.description,
          price: Number(newProduct.price),
          barcode: newProduct.barcode
        }
      })
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
      await this.$apollo
        .query({
          query: FETCHPRODUCTS
        })
        .then(({ data }) => {
          this.products = data.products
        })
    }

  }
}
</script>
