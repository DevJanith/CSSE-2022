<template>
  <div class="px-15 secondary">
    <v-row class="my-5">
      <v-icon size="35">airport_shuttle</v-icon>
      <h1 class="headingLarge ml-4">Passengers Journeys List</h1>
    </v-row>
    <div class="titleLarge my-10">
      <v-row class="ml-2">
        Total Revenue <v-icon class="ml-3">paid</v-icon>
        <div class="mx-3 primary--text">{{ totalAmount.toLocaleString() }}</div>
        LKR

        <v-spacer></v-spacer>
        <!-- <v-btn
          class="text-capitalize white--text mr-3"
          color="#dc5353"
          @click="addcreditDialog = true"
          :loading="isLoading"
          >Download Data
          <v-icon class="ml-3">download</v-icon>
        </v-btn> -->
        <div class="download downloadText">
          <VueJsonToCsv
            :json-data="tableData"
            csv-title="Passenger Journey Report"
          >
            <v-btn color="orange" class="text-capitalize">
              Download Report
              <v-icon>file_download</v-icon>
            </v-btn>
          </VueJsonToCsv>
        </div>
      </v-row>
    </div>
    <v-card
      min-height="450"
      min-width="300"
      max-height="800"
      elevation="14"
      rounded="true"
      class="pa-7 fill-height mb-10"
    >
      <v-row class="mb-5">
        <v-container fluid>
          <v-data-table
            class="app-text tableText secondary table dataTable"
            :headers="headers"
            :items="tableData"
            :loading="tableLoading"
            loading-text
            :footer-props="footerProps"
          >
            <!-- header -->
            <template v-slot:[`header.date`]="{ header }">
              <v-icon small class="mr-1 mb-1">calendar_month</v-icon
              >{{ header.text }}
            </template>

            <template v-slot:[`header.busNo`]="{ header }">
              <v-icon small class="mr-1 mb-1">airport_shuttle</v-icon
              >{{ header.text }}
            </template>

            <template v-slot:[`header.startLocation`]="{ header }">
              <v-icon small class="mr-1 mb-1">start</v-icon>{{ header.text }}
            </template>

            <template v-slot:[`header.endLocation`]="{ header }">
              <v-icon small class="mr-1 mb-1">flag</v-icon>{{ header.text }}
            </template>

            <template v-slot:[`header.fare`]="{ header }">
              <v-icon small class="mr-1 mb-1">paid</v-icon>{{ header.text }}
            </template>

            <!-- data -->
            <!-- <template v-slot:[`item.month`]="{ item }">
              <div>
                <router-link
                  class-active="active"
                  :to="'/monthly-active-subscribers/' + item.month"
                  >{{ convertMonth(item.month) }}</router-link
                >
              </div>
            </template> -->
          </v-data-table>
        </v-container>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import VueJsonToCsv from "vue-json-to-csv";
export default {
  components: { VueJsonToCsv },
  data() {
    return {
      footerProps: { "items-per-page-options": [5, 10] },
      tableLoading: false,
      totalAmount: "",
      headers: [
        {
          text: "Bus No",
          align: "start",
          filterable: false,
          value: "busNo",
          class: "white",
        },

        {
          text: "Date",
          align: "start",
          value: "date",
          class: "white",
        },
        {
          text: "Start Location",
          value: "startLocation",
          align: "start",
          class: "white",
        },
        {
          text: "End Location",
          value: "endLocation",
          align: "start",
          class: "white",
        },
        {
          text: "Fare",
          value: "fare",
          align: "start",
          class: "white",
        },
      ],

      tableData: [],
    };
  },

  methods: {
    getJourneys() {
      this.tableLoading = true;
      const id = sessionStorage.getItem("id");
      axios
        .get(`/ticketnow/api/v1/journey/all`)
        .then((response) => {
          this.tableLoading = false;

          if (response.status == 200) {
            this.tableData = response.data.data;
            this.totalAmount = response.data.totalAmount;
          }
        })
        .catch((err) => {
          console.log(err);
          this.tableLoading = false;
        });
    },
  },

  mounted() {
    this.getJourneys();
  },
};
</script>

<style scoped>
.tableText {
  font-weight: 550;
}
.tableData {
  display: flex;
  align-items: flex-start;
}

.label-top {
  font-weight: 500;
}
.table >>> th {
  font-size: 17px !important;
}
.table >>> tr > td {
  font-size: 16px !important;
}

.table >>> .v-data-footer__select,
.table >>> .v-select__selection,
.table >>> .v-data-footer__pagination {
  font-size: 16px;
}
/* .dataTable {
  max-width: 1100px;
} */
.download {
  cursor: pointer;
}
.downloadText {
  font-size: 20px;
}
</style>
