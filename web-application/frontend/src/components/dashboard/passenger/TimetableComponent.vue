<template>
  <div class="pt-10">
    <passenger-app-bar />
    <v-btn fab class="ml-8 mb-8 white--text" color="#e16b6b" @click="gotoHome()"
      ><v-icon>arrow_back</v-icon></v-btn
    >
    <div class="px-15">
      <v-row class="mb-5">
        <v-icon size="35">schedule</v-icon>
        <h1 class="headingLarge ml-4">Bus Timetable</h1>
        <v-spacer></v-spacer>
        <v-btn
          class="ml-3 text-capitalize mt-3"
          color="warning"
          @click="dialog = true"
          >View On Calender <v-icon class="ml-3">calendar_month</v-icon></v-btn
        >
      </v-row>

      <v-container class="pa-0 mb-8"> </v-container>

      <v-row align="center" justify="center">
        <v-col cols="9">
          <Timetable />
        </v-col>
      </v-row>
    </div>
    <!-- <v-dialog v-model="dialog" width="900" persistent>
      <v-card>
        <v-row>
          <v-col>
            <v-sheet height="400">
              <v-calendar
                ref="calendar"
                :now="today"
                :value="today"
                :events="events"
                color="primary"
                type="week"
              ></v-calendar>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog> -->

    <v-dialog v-model="dialog" width="90%" persistent>
      <v-card>
        <v-card-title class="text-h5 primary white--text">
          Timetable
        </v-card-title>

        <v-container>
          <v-card>
            <v-row>
              <v-col>
                <v-sheet height="400">
                  <v-calendar
                    ref="calendar"
                    :now="today"
                    :value="today"
                    :events="events"
                    color="primary"
                    type="week"
                  ></v-calendar>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card>

          <v-divider></v-divider>
          <div class="">
            <v-row class="mt-3">
              <v-col cols="12">
                <v-btn
                  class="rounded-lg h5 primary--text text-capitalize mt-2"
                  width="100%"
                  outlined
                  @click="dialog = false"
                >
                  <div class="btnText">Close</div></v-btn
                >
              </v-col>
            </v-row>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import PassengerAppBar from "@/views/appbars/PassengerAppBar.vue";

import axios from "axios";
import Timetable from "./Timetable.vue";
import moment from "moment";

export default {
  components: { PassengerAppBar, Timetable },

  data() {
    return {
      dialog: false,
      userID: sessionStorage.getItem("userID"),
      id: sessionStorage.getItem("id"),
      credits: "",
      today: moment().format("YYYY-MM-DD"),
      events: [
        // {
        //   name: "Weekly Meeting",
        //   start: "2019-01-07 09:00",
        //   end: "2019-01-07 09:00",
        // },
        // {
        //   name: "Weekly Meeting",
        //   start: "2019-01-07 10:00",
        //   end: "2019-01-07 10:00",
        // },
        // {
        //   name: `Thomas' Birthday`,
        //   start: "2019-01-10",
        // },
        // {
        //   name: "Mash Potatoes",
        //   start: "2019-01-09 12:30",
        //   end: "2019-01-09 15:30",
        // },
      ],
    };
  },

  methods: {
    gotoHome() {
      this.$router.push("/passenger-dashboard");
    },
    getTimetable() {
      axios
        .get(`/ticketnow/api/v1/transport`)
        .then((response) => {
          this.tableLoading = false;

          if (response.status == 200) {
            let data = response.data;

            let eventArray = [];
            data.forEach((element) => {
              var tempObject = {
                name: element.busNO,
                start: element.dateTime,
                end: element.dateTime,
              };

              eventArray.push(tempObject);
            });

            this.events = eventArray;
            console.log(this.events);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getTimetable();
    this.$refs.calendar.scrollToTime("08:00");
  },
};
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>
