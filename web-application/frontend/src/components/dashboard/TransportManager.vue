<template>
  <div class="fill-height secondary">
    <v-toolbar color="primary" dark flat height="70">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-img
        alt="Ticket Us Logo"
        class="shrink mt-3"
        contain
        src="../../assets/logo.png"
        transition="scale-transition"
        width="70"
      />

      <h1 class="text--white">Ticket Us</h1>
      <h3 class="ml-10">Transport Manager Dashboard</h3>

      <v-spacer></v-spacer>

      <div class="mr-4">
        <v-row>
          <v-col cols="2"
            ><v-icon size="40" class="mt-1">account_circle</v-icon></v-col
          >
          <v-col>
            <div class="title ml-3">{{ name }}</div>
            <div class="titleSmall ml-3">{{ type }}</div></v-col
          >
        </v-row>
      </div>

      <v-btn @click="confirmDialog.show = true" text>
        <span class="mr-2">Logout</span>
        <v-icon>logout</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="white"></v-tabs-slider>

          <v-tab class="white--text text-capitalized">
            <p>Customer Journeys</p>
          </v-tab>

          <v-tab class="white--text text-capitalized">
            <p>Timetables</p>
          </v-tab>

          <v-tab class="white--text text-capitalized">
            <p>Manage Drivers</p>
          </v-tab>
          <v-tab class="white--text text-capitalized">
            <p>Manage Busses</p>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <div class="fill-height secondary">
          <CustomerJourneys />
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="fill-height secondary">
          <Timetables />
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="fill-height secondary">
          <ComingSoon />
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="fill-height secondary">
          <ComingSoon />
        </div>
      </v-tab-item>
    </v-tabs-items>

    <ConfirmDialog
      v-if="confirmDialog.show"
      :message="confirmDialog.message"
      :message1="confirmDialog.message1"
      :buttonText="confirmDialog.buttonText"
      @close-alert="confirmDialog.show = false"
      @confirm-alert="logout()"
    />
  </div>
</template>

<script>
import ComingSoon from "../common/ComingSoon.vue";
import ConfirmDialog from "../common/ConfirmDialog.vue";
import CustomerJourneys from "./manager/CustomerJourneys.vue";
import Timetables from "./manager/Timetables.vue";
export default {
  components: { ConfirmDialog, CustomerJourneys, Timetables, ComingSoon },
  data() {
    return {
      tab: null,
      name: sessionStorage.getItem("name"),
      type: "Transport Manager",
      confirmDialog: {
        show: false,
        message: "Logout",
        message1: "Are you sure you want to logout?",
        buttonText: "Yes",
      },
    };
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
