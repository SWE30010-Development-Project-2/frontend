<template>
  <div>
    <!-- Modals -->
    <!-- Confirm Delete Modal -->
    <confirm-delete-modal
      id="confirm-delete-modal"
      :item="{ time: formatAsTime(deleteModalData.createdAt), itemsSold: formatListAllProducts(deleteModalData.productsNice) }"
      :item-property-labels="{ time: 'Time of Sale', itemsSold: 'Items Sold' }"
      @confirm-deletion="deleteTransaction(deleteModalData.id)"
    />

    <!-- Edit Modal -->
    <edit-transaction-modal
      :transaction="editModalData"
      @commitEdit="commitEdit($event, $event.id)"
    />

    <!-- Info Modal -->
    <transaction-info-modal :transaction="infoModalData" />

    <!-- Page -->
    <navbar title="Display Sales Record" />

    <b-container fluid>
      <!-- User Interface controls -->
      <b-row class="mt-3 mb-3">
        <b-col>
          <time-selection-buttons @today="filterByDate('today')" @week="filterByDate('week')" @month="filterByDate('month')" @year="filterByDate('year')" />
        </b-col>
        <b-col cols="auto">
          <b-button variant="warning" @click="exportToCSV(transactions)">
            Export to CSV
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="6" class="my-1">
          <sort-control :sort-value="{sortBy, sortDesc}" :sort-options="sortOptions" @input="sortBy = $event.sortBy; sortDesc=$event.sortDesc" />
        </b-col>

        <b-col lg="6" class="my-1">
          <filter-control :filter="filter" @input="filter = $event" />
        </b-col>

        <!-- Main table element -->
        <b-table
          show-empty
          small
          stacked="md"
          :items="transactions"
          :fields="fields"
          :filter="filter"
          :filter-included-fields="filterOn"
          :today="today"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
        >
          <template v-slot:cell(price)="row">
            {{ formatAsPrice(row.value) }}
          </template>

          <template v-slot:cell(createdAt)="row">
            {{ formatAsTime(row.value) }}
          </template>

          <template v-slot:cell(productsNice)="row">
            {{ formatListProductsShort(row.value) }}
          </template>

          <template v-slot:cell(actions)="row">
            <b-button variant="info" size="sm" class="mr-1" @click="displayInfoModal(row.item)">
              Info
            </b-button>
            <b-button variant="primary" size="sm" @click="displayEditModal(row.item)">
              Edit
            </b-button>
            <b-button variant="danger" size="sm" @click="displayDeleteModal(row.item)">
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
import { mapGetters } from 'vuex'
import Navbar from '~/components/Navbar.vue'
import TimeSelectionButtons from '~/components/TimeSelectionButtons.vue'
import SortControl from '~/components/SortControl.vue'
import FilterControl from '~/components/FilterControl.vue'
import ConfirmDeleteModal from '~/components/ConfirmDeleteModal.vue'
import EditTransactionModal from '~/components/EditTransactionModal.vue'
import FETCH_TRANSACTIONS from '~/graphql/sale/FETCH_TRANSACTIONS.gql'
import TransactionInfoModal from '~/components/TransactionInfoModal.vue'
import REMOVE_TRANSACTION from '~/graphql/sale/REMOVE_TRANSACTION.gql'
import Formatting from '~/assets/formatting.js'
import CSV from '~/assets/csv.js'

export default {
  components: {
    Navbar, TimeSelectionButtons, SortControl, FilterControl, ConfirmDeleteModal, EditTransactionModal, TransactionInfoModal
  },
  data () {
    return {
      transactionsRawData: [],
      fields: [
        { key: 'createdAt', label: 'Time of Sale', sortable: true },
        { key: 'NoItems', label: 'No of Items', sortable: true, sortDirection: 'desc', class: 'text-center' },
        { key: 'price', label: 'Cost of Sale', sortable: true, sortDirection: 'desc', class: 'text-center' },
        { key: 'productsNice', label: 'Items Sold', class: 'text-left' },
        { key: 'actions', label: 'Actions' }
      ],
      // totalRows: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      today: '',
      editModalData: {},
      deleteModalData: {},
      infoModalData: {}
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
    },
    transactions () {
      return this.transactionsRawData.map(function (t) {
        // Number of items
        let NoItems = 0
        if (t.products != null) {
          NoItems = t.products.length
        }

        // Price
        let price = 0
        if (t.products != null) {
          for (const p of t.products) {
            price += p.price
          }
        }

        // Nice List of items
        const productsNice = []
        if (t.products != null) {
          const productsNoDuplicates = Array.from(new Set(t.products))
          for (const product of productsNoDuplicates) {
            const qty = t.products.filter(p => p.id === product.id).length
            productsNice.push({ product, qty })
          }
        }

        return { NoItems, price, productsNice, ...t }
      })
    },
    ...mapGetters({
      user: 'auth/user'
    })
  },
  mounted () {
    setTimeout(async () => { await this.fetchTransactions() }, 200)

    if (this.user === null) {
      this.$router.push('/login')
    }
  },
  methods: {
    ...Formatting,
    ...CSV,
    displayEditModal (transaction) {
      this.editModalData = transaction
      this.$bvModal.show('edit-modal')
    },
    displayInfoModal (transaction) {
      this.infoModalData = transaction
      this.$bvModal.show('info-modal')
    },
    displayDeleteModal (transaction) {
      this.deleteModalData = transaction
      this.$bvModal.show('confirm-delete-modal')
    },
    async deleteTransaction (id) {
      // Remove locally
      this.transactionsRawData = this.transactionsRawData.filter(transaction => transaction.id !== id)

      // Remove from server
      await this.$apollo.mutate({
        mutation: REMOVE_TRANSACTION,
        variables: { id }
      })
    },
    commitEdit (newItem, id) {
      // Update locally
      this.transactionsRawData = this.transactionsRawData.filter(transaction => transaction.id !== id)
      this.transactionsRawData.push(newItem)

      // TODO - update to server
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
    async fetchTransactions () {
      await this.$apollo
        .query({
          query: FETCH_TRANSACTIONS
        })
        .then(({ data }) => {
          this.transactionsRawData = data.transactions
        })
    }
  }
}
</script>
