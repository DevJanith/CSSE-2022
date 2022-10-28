<template>
  <div class="pt-10">
    <passenger-app-bar />
    <v-btn fab color="ml-8 mb-8" @click="gotoHome()"
      ><v-icon>arrow_back</v-icon></v-btn
    >
    <div class="px-15">
      <v-row class="mb-5">
        <v-icon size="35">schedule</v-icon>
        <h1 class="headingLarge ml-4">Bus Timetable</h1>
        <v-spacer></v-spacer>
        <v-btn class="ml-3 text-capitalize mt-3" color="warning"
          >View Bus Timetable <v-icon class="ml-3">schedule</v-icon></v-btn
        >
      </v-row>

      <v-container class="pa-0 mb-8"> </v-container>

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

import axios from "axios";
import Timetable from "./Timetable.vue";

export default {
  components: { PassengerAppBar, Timetable },

  data() {
    return {
      userID: sessionStorage.getItem("userID"),
      id: sessionStorage.getItem("id"),
      credits: "",
    };
  },

  methods: {
    gotoHome() {
      this.$router.push("/passenger-dashboard");
    },
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
