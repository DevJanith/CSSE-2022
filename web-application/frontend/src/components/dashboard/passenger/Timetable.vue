<template>
  <div>
    <v-card
      min-height="450"
      min-width="300"
      max-height="800"
      elevation="14"
      rounded="true"
      class="pa-7"
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
            <template v-slot:[`header.dateTime`]="{ header }">
              <v-icon small class="mr-1 mb-1">calendar_month</v-icon
              >{{ header.text }}
            </template>

            <!-- <template v-slot:[`header.busNo`]="{ header }">
              <v-icon small class="mr-1 mb-1">airport_shuttle</v-icon
              >{{ header.text }}
            </template> -->

            <template v-slot:[`header.location`]="{ header }">
              <v-icon small class="mr-1 mb-1">pin_drop</v-icon>{{ header.text }}
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
export default {
  data() {
    return {
      footerProps: { "items-per-page-options": [5, 10] },
      tableLoading: false,
      headers: [
        {
          text: "Bus No",
          align: "start",
          filterable: false,
          value: "busNO",
          class: "white",
        },

        {
          text: "Date",
          align: "start",
          value: "dateTime",
          class: "white",
        },
        {
          text: "Location",
          align: "start",
          value: "location",
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
          text: "Travelling Root",
          value: "travelingRoot",
          align: "start",
          class: "white",
        },
      ],

      tableData: [
        // {
        //   busNo: "asass",
        //   dateTime: "Fri Oct 28 2022 10:49:13 GMT+0530 (India Standard Time)",
        //   location: "Location",
        //   travelingRoot: "Root",
        //   startLocation: "Start Location",
        //   endLocation: "End Location",
        // },
        // {
        //   busNo: "asass",
        //   dateTime: "Fri Oct 29 2022 10:49:13 GMT+0530 (India Standard Time)",
        //   location: "Location",
        //   travelingRoot: "Root",
        //   startLocation: "Start Location",
        //   endLocation: "End Location",
        // },
        // {
        //   busNo: "asass",
        //   dateTime: "Fri Oct 30 2022 10:49:13 GMT+0530 (India Standard Time)",
        //   location: "Location",
        //   travelingRoot: "Root",
        //   startLocation: "Start Location",
        //   endLocation: "End Location",
        // },
        // {
        //   busNo: "asass",
        //   dateTime: "Fri Oct 31 2022 10:49:13 GMT+0530 (India Standard Time)",
        //   location: "Location",
        //   travelingRoot: "Root",
        //   startLocation: "Start Location",
        //   endLocation: "End Location",
        // },
      ],
    };
  },

  methods: {
    getTimetable() {
      this.tableLoading = true;
      const id = sessionStorage.getItem("id");
      axios
        .get(`/ticketnow/api/v1/transport`)
        .then((response) => {
          this.tableLoading = false;

          if (response.status == 200) {
            this.tableData = response.data;
          }
        })
        .catch((err) => {
          console.log(err);
          this.tableLoading = false;
        });
    },
  },

  mounted() {
    this.getTimetable();
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
  max-width: 1500;
} */
</style>
