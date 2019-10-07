<template>
  <div>
    <navbar title="Home" />
    <div class="container">
      <b-row class="pt-5 pb-5">
        <b-col>
          <h1 class="display-4 text-center">
            Sales Statistics
          </h1>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col>
          <h2>Select Items</h2>
          <b-card no-body>
            <b-tabs card>
              <b-tab title="All Items" active>
                <b-card-text>
                  All Items Selected
                </b-card-text>
              </b-tab>
              <b-tab title="Single Items">
                <b-row>
                  <b-col>
                    <h4>Choose Items for the Report</h4>
                    <b-form-group
                      label="Select Item"
                      label-for="filterInput"
                    >
                      <b-input-group>
                        <b-form-input
                          id="filterInput"
                          v-model="filter"
                          type="search"
                          placeholder="Type to Search"
                        />
                        <div class="w-100" style="position: absolute; top: 100%; z-index: 100; left: 0px; right: auto;">
                          <b-list-group>
                            <searched-item name="item 1" img="/images/paracetamol.jpg" add />
                          </b-list-group>
                        </div>
                        <b-input-group-append>
                          <b-button variant="outline-secondary">
                            Clear
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <h4>Selected Items</h4>
                    <b-list-group>
                      <searched-item name="item 1" img="/images/paracetamol.jpg" />
                      <searched-item name="item 1" img="/images/paracetamol.jpg" />
                    </b-list-group>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Item Categories">
                <b-card-text>Select Category/Group</b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mb-4">
        <b-col>
          <h2>Time Period</h2>
          <b-card>
            <b-row class="mb-4">
              <b-col>
                <h4>Time Granularity</h4>
                <b-button-group>
                  <template v-if="weekly">
                    <b-button variant="primary">
                      Weekly
                    </b-button>
                    <b-button variant="outline-primary" @click="weekly=false">
                      Monthly
                    </b-button>
                  </template>
                  <template v-else>
                    <b-button variant="outline-primary" @click="weekly=true">
                      Weekly
                    </b-button>
                    <b-button variant="primary">
                      Monthly
                    </b-button>
                  </template>
                </b-button-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <h4>Start Date</h4>
                <b-form-select v-model="yearStart" :options="[2019,2018]" class="mb-3">
                  <template v-slot:first>
                    <option :value="null" disabled>
                      -- Please select a year --
                    </option>
                  </template>
                </b-form-select>

                <template v-if="weekly">
                  <b-form-select v-model="weekStart" :options="[1,2,3,4,54]" class="mb-3">
                    <template v-slot:first>
                      <option :value="null" disabled>
                        -- Please select a week --
                      </option>
                    </template>
                  </b-form-select>
                </template>
                <template v-else>
                  <b-form-select v-model="monthStart" :options="['Jan', 'Feb']" class="mb-3">
                    <template v-slot:first>
                      <option :value="null" disabled>
                        -- Please select a month --
                      </option>
                    </template>
                  </b-form-select>
                </template>
              </b-col>
              <b-col>
                <h4>End Date</h4>
                <b-form-select v-model="yearEnd" :options="[2019,2018]" class="mb-3">
                  <template v-slot:first>
                    <option :value="null" disabled>
                      -- Please select a year --
                    </option>
                  </template>
                </b-form-select>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="text-right">
          <b-button variant="primary">
            Generate Report
          </b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import SearchedItem from '~/components/SearchedItem.vue'

export default {
  components: {
    Navbar, SearchedItem
  },
  data () {
    return {
      weekly: false,
      yearStart: null,
      yearEnd: null,
      weekStart: null,
      monthStart: null
    }
  }
}
</script>

<style lang="scss">
h1, h2 {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.big-icon {
  font-size: 4rem;
}
</style>
