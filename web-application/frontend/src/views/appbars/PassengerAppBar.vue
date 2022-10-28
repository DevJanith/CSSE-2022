<template>
  <v-app-bar app color="primary" dark height="100">
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="../../assets/logo.png"
        transition="scale-transition"
        width="70"
      />

      <h1 class="text--white">Ticket Us</h1>
    </div>

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

    <ConfirmDialog
      v-if="confirmDialog.show"
      :message="confirmDialog.message"
      :message1="confirmDialog.message1"
      :buttonText="confirmDialog.buttonText"
      @close-alert="confirmDialog.show = false"
      @confirm-alert="logout()"
    />
  </v-app-bar>
</template>

<script>
import ConfirmDialog from "../../components/common/ConfirmDialog.vue";
export default {
  components: {
    ConfirmDialog,
  },
  data() {
    return {
      confirmDialog: {
        show: false,
        message: "Logout",
        message1: "Are you sure you want to logout?",
        buttonText: "Yes",
      },
      name: sessionStorage.getItem("name"),
      type: "Passenger",
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

<style scoped></style>
