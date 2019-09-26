<template>
  <div>
    <!-- Modals -->
    <!-- Confirm Delete -->
    <confirm-delete-modal
      id="confirm-delete"
      :item="confirmDeleteModal.item"
      :index="confirmDeleteModal.index"
      :item-property-labels="{ TransactionNo: 'Transaction Code', price: 'Cost of Sale', NoItems: 'No of Items', time: 'Time of Sale' }"
      @confirm-deletion="deleteRow(confirmDeleteModal.index)"
    />
    <edit-modal
      id="confirm-edit"
      :item="editModal.item"
      :index="editModal.index"
      :item-property-labels="{ TransactionNo: 'Transaction Code', price: 'Cost of Sale', NoItems: 'No of Items', time: 'Time of Sale' }"
      @confirm-deletion="editTransaction(editModal.index)"
    />

    <!-- Info modal -->
    <!-- <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <template v-slot:default="{ hide }">
        <p>{{ infoModal.content[1] }}</p>
      </template>

      <pre>{{ infoModal.content }}</pre>
    </b-modal> -->

    <!-- Page -->
    <navbar title="Display Sales Record" />

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
            <b-button size="sm" @click="editInfo(row.item, row.index)">
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

        </b-table>
      </b-row>
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
export default {
  components: {
    Navbar, TimeSelectionButtons, SortControl, FilterControl, ConfirmDeleteModal, EditModal
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
      // infoModal: {
      //   id: 'info-modal',
      //   title: '',
      //   content: '',
      //   TransactionNo: '',
      //   money: '$'
      // },
      editModal: {
        index: null,
        item: { TransactionNo: -1, price: -1, NoItems: -1, time: '' }
      },
      confirmDeleteModal: {
        index: null,
        item: { TransactionNo: -1, price: -1, NoItems: -1, time: '' }
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
    // info (item, index, button) {
    //   this.infoModal.title = item.TransactionNo
    //   this.infoModal.content = item
    //   this.infoModal.TransactionNo = item.TransactionNo
    //   this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    // },
    editInfo (item, index) {
      const niceitem = { TransactionNo: item.TransactionNo, price: item.price.cost, NoItems: item.NoItems, time: item.time }
      this.editModal = { item: niceitem, index }
      this.$bvModal.show('confirm-edit')
    },
    // resetInfoModal () {
    //   this.infoModal.title = ''
    //   this.infoModal.content = ''
    // },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pprices due to filtering
      this.totalRows = filteredItems.length
      this.currentPprice = 1
    },
    confirmDeleteRow (item, index) {
      const niceitem = { TransactionNo: item.TransactionNo, price: item.price.cost, NoItems: item.NoItems, time: item.time }
      this.confirmDeleteModal = { item: niceitem, index }
      this.$bvModal.show('confirm-delete')
    },
    deleteRow (index) {
      this.items.splice(index, 1)
      // TODO - send delete to server
    },
    editTransaction (index) {
      this.items.splice(index, 1)
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
