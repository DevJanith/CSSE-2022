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

    <v-btn href="/" text>
      <span class="mr-2">Login</span>
      <v-icon>login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style></style>
