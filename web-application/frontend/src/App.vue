<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logo.png"
          transition="scale-transition"
          width="50"
        />

        <h1 class="text--white">Ticket Now</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@600;621&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Quicksand:wght@300;400;500;600;700&display=swap");

.app-text {
  font-family: "Quicksand", sans-serif;
}
.heading {
  font-size: 20px;
  font-family: "Quicksand", sans-serif;
  color: #4e4e6a;
  font-weight: 600;
}
</style>
