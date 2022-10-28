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

    <v-btn @click="logout()" text>
      <span class="mr-2">Logout</span>
      <v-icon>logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
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
>
