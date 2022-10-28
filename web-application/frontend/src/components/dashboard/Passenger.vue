<template>
  <div class="pt-10">
    <passenger-app-bar />
    <div class="px-15">
      <v-row class="mb-5">
        <v-icon size="35">dashboard</v-icon>
        <h1 class="headingLarge ml-4">Passenger Dashboard</h1>
      </v-row>

      <v-container class="pa-0 mb-8">
        <v-row class="my-5">
          <div class="titleLarge">
            <v-row>
              You have
              <div class="mx-3 primary--text">{{ credits }}</div>
              Credits available in your account
              <v-btn class="ml-3" color="warning">Add More Credit</v-btn>
            </v-row>
          </div>
        </v-row>
      </v-container>

      <v-row>
        <v-col cols="6"> <QRCode /> </v-col>
        <v-col cols="6">
          <PreviousJourneys />
        </v-col>
      </v-row>

      <v-row align="center" justify="center">
        <v-col cols="8">
          <Timetable />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import PassengerAppBar from "@/views/appbars/PassengerAppBar.vue";
import QRCode from "./passenger/QRCode.vue";
import PreviousJourneys from "./passenger/PreviousJourneys.vue";
import Timetable from "./passenger/Timetable.vue";
import axios from "axios";
export default {
  components: { PassengerAppBar, QRCode, PreviousJourneys, Timetable },

  data() {
    return {
      userID: sessionStorage.getItem("userID"),
      id: sessionStorage.getItem("id"),
      credits: "",
    };
  },

  methods: {
    getUserData() {
      axios
        .get(`/ticketnow/api/v1/user/${this.id}`)
        .then((response) => {
          this.verifyingOTP = false;

          if (response.status == 200) {
            this.credits = response.data.result.creditAmount;
          } else {
            this.credits = "N/A";
          }
        })
        .catch((err) => {
          console.log(err);
          this.credits = "N/A";
        });
    },
  },

  mounted() {
    this.getUserData();
  },
};
</script>

<style scoped></style>
