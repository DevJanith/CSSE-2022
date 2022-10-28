<template>
  <v-dialog width="500" :value="true" persistent>
    <v-card>
      <v-card-title class="text-h5 primary white--text">
        {{ message }}
      </v-card-title>

      <v-card-text class="mt-2 subtitle-1">
        {{ message1 }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="close" outlined class="mr-5"> Cancel </v-btn>
        <v-btn color="green" @click="confirm" outlined>
          {{ buttonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
    },
    message1: {
      type: String,
    },
    message2: {
      type: String,
    },
    buttonText: {
      type: String,
    },
  },
  methods: {
    close() {
      this.$emit("close-alert");
    },
    confirm() {
      this.$emit("confirm-alert");
    },
  },
};
</script>
