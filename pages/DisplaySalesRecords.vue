<template>
  <div>
    <!-- Modals -->
    <!-- Confirm Delete Modal -->
    <confirm-delete-modal
      id="confirm-delete-modal"
      :item="confirmDeleteModal.item"
      :index="confirmDeleteModal.index"
      :item-property-labels="{ time: 'Time of Sale', itemsSoldLong: 'Items Sold' }"
      @confirm-deletion="deleteRow(confirmDeleteModal.item.id)"
    />

    <!-- Edit Modal -->
    <edit-modal
      id="edit-modal"
      :item="editModal.item"
      :index="editModal.index"
      :item-property-labels="{ }"
      @commitEdit="commitEdit($event,editModal.index)"
    />

    <!-- Info Modal -->
    <transaction-info-modal :transaction="infoModal.item" />

    <!-- Page -->
    <navbar title="Display Sales Record" />

    <b-container fluid>
      <!-- User Interface controls -->

      <b-row class="mt-3 mb-3">
        <b-col>
          <time-selection-buttons @today="filterByDate('today')" @week="filterByDate('week')" @month="filterByDate('month')" @year="filterByDate('year')" />
        </b-col>
        <b-col cols="auto">
          <b-button variant="warning" @click="exportToCSV">
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
          :current-psales="currentPsales"
          :per-psales="perPsales"
          :filter="filter"
          :filter-included-fields="filterOn"
          :today="today"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
        >
          <template v-slot:cell(price)="row">
            $ {{ row.value.toFixed(2) }}
          </template>

          <template v-slot:cell(actions)="row">
            <b-button variant="info" size="sm" class="mr-1" @click="showInfo(row.item, row.index)">
              Info
            </b-button>
            <b-button variant="primary" size="sm" @click="editInfo(row.item, row.index)">
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

        </b-table>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import moment from 'moment'
import jsoncsv from 'json-csv'
import FileSaver from 'file-saver'
import Navbar from '~/components/Navbar.vue'
import TimeSelectionButtons from '~/components/TimeSelectionButtons.vue'
import SortControl from '~/components/SortControl.vue'
import FilterControl from '~/components/FilterControl.vue'
import ConfirmDeleteModal from '~/components/ConfirmDeleteModal.vue'
import EditModal from '~/components/EditModal.vue'
import FETCH_TRANSACTIONS from '~/graphql/sale/FETCH_TRANSACTIONS.gql'
import TransactionInfoModal from '~/components/TransactionInfoModal.vue'
import REMOVE_TRANSACTION from '~/graphql/sale/REMOVE_TRANSACTION.gql'

export default {
  components: {
    Navbar, TimeSelectionButtons, SortControl, FilterControl, ConfirmDeleteModal, EditModal, TransactionInfoModal
  },
  data () {
    return {
      transactionsRawData: [],
      fields: [
        { key: 'time', label: 'Time of Sale', sortable: true },
        { key: 'NoItems', label: 'No of Items', sortable: true, sortDirection: 'desc', class: 'text-center' },
        { key: 'price', label: 'Cost of Sale', sortable: true, sortDirection: 'desc', class: 'text-center' },
        { key: 'itemsSold', label: 'Items Sold', class: 'text-left' },
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
      editModal: {
        index: null,
        item: { TransactionNo: -1, price: -1, NoItems: -1, time: '' }
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

        // Time of sale
        const time = moment(Number(t.createdAt)).format('h:mm:ss a, DD/MM/YYYY')

        // Items sold
        let itemsSold = ''
        const maxLength = 3
        if (t.products != null) {
          for (const p of t.products.slice(0, maxLength)) {
            itemsSold += p.name + ', '
          }
          if (t.products.length > maxLength) {
            itemsSold = itemsSold.slice(0, -2) + ' and ' + String(t.products.length - maxLength) + ' other items'
          } else {
            itemsSold = itemsSold.slice(0, -2)
          }
        }

        // All items sold
        let itemsSoldLong = ''
        if (t.products != null) {
          for (const p of t.products) {
            itemsSoldLong += p.name + ', '
          }
          itemsSoldLong = itemsSoldLong.slice(0, -2)
        }

        return { NoItems, price, time, itemsSold, itemsSoldLong, ...t }
      })
    }
  },
  mounted () {
    setTimeout(async () => { await this.fetchTransactions() }, 200)
  },
  methods: {
    editInfo (item, index) {
      const niceitem = { TransactionNo: item.TransactionNo, price: item.price.cost, NoItems: item.NoItems, time: item.time }
      this.editModal = { item: niceitem, index }
      this.$bvModal.show('edit-modal')
    },
    showInfo (item, index) {
      this.infoModal = { item, index }
      this.$bvModal.show('info-modal')
    },
    confirmDeleteRow (item, index) {
      this.confirmDeleteModal = { item, index }
      this.$bvModal.show('confirm-delete-modal')
    },
    async deleteRow (id) {
      // Remove locally
      this.transactionsRawData = this.transactionsRawData.filter(transaction => transaction.id !== id)

      // Remove from server
      await this.$apollo.mutate({
        mutation: REMOVE_TRANSACTION,
        variables: { id }
      })
    },
    commitEdit (newItem, index) {
      this.transactions[index] = { TransactionNo: newItem.TransactionNo, price: { cost: newItem.price }, NoItems: newItem.NoItems, time: newItem.time }
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
    },
    exportToCSV () {
      const data = this.transactions.map(t => ({ id: t.id, noItems: t.NoItems, itemsSold: t.itemsSoldLong, price: t.price, time: t.time }))
      const options = {
        fields: [
          {
            name: 'id',
            label: 'Transaction ID',
            quoted: true
          },
          {
            name: 'noItems',
            label: 'Number of Items',
            quoted: true
          },
          {
            name: 'itemsSold',
            label: 'Items Sold',
            quoted: true
          },
          {
            name: 'price',
            label: 'Price of Transaction',
            quoted: true
          },
          {
            name: 'time',
            label: 'Time of transaction',
            quoted: true
          }
        ]
      }

      jsoncsv.csvBuffered(data, options, (err, csv) => {
        if (!err) {
          const blob = new Blob([csv], { type: 'text/plain;charset=utf-8' })
          FileSaver.saveAs(blob, 'transactions.csv')
        } else {
          console.log(err)
        }
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
