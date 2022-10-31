<template>
  <div class="fill-height secondary">
    <login-app-bar />
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="6">
          <v-card class="pb-10 mt-4 pr-8" elevation="10">
            <div>
              <center>
                <img
                  src="../../assets/logo.png"
                  alt=""
                  width="150"
                  class="ml-10 mt-3"
                />
              </center>
              <!-- <p class="primary--text ml-10 subname">CFI DASHBOARD</p> -->

              <div class="mx-10">
                <h1 class="app-text">Login</h1>
              </div>
              <div class="ml-8">
                <v-form ref="form" @submit.prevent="login">
                  <v-container>
                    <div>
                      <p class="app-text">User ID</p>
                      <v-text-field
                        label="NIC / User ID / Passport Number"
                        outlined
                        v-model="userID"
                        :rules="userIDCheck"
                        dense
                      ></v-text-field>
                    </div>
                    <div>
                      <p class="app-text">Password</p>
                      <v-text-field
                        outlined
                        label="Password"
                        v-model="password"
                        :rules="passwordcheck"
                        @click:append="() => (value = !value)"
                        :type="value ? 'password' : 'text'"
                        :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
                        dense
                      ></v-text-field>
                    </div>
                    <div class="mt-2 app-text">
                      <v-row class="ml-2">
                        <v-checkbox
                          style="fontSize= 10px"
                          type="checkbox"
                          label="Remember me"
                        ></v-checkbox>
                        <v-spacer></v-spacer>
                        <div class="mt-5">Don't have an account</div>
                        <router-link to="/register" class="mt-5 ml-10 mr-5">
                          <p
                            style="fontsize: 15px text-right"
                            class="primary--text"
                          >
                            Register Here
                          </p>
                        </router-link>
                      </v-row>
                    </div>
                    <div class="mt-6">
                      <v-btn
                        color="primary"
                        width="100%"
                        class="text-capitalize"
                        type="submit"
                        :loading="isLoading"
                        >Log in</v-btn
                      >
                    </div>
                  </v-container>
                </v-form>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-snackbar v-model="message.chip" top rounded="pill" :color="message.color"
      ><div class="text-center">
        {{ message.text }}
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import AppBar from "@/views/AppBar.vue";
import LoginAppBar from "@/views/appbars/LoginAppBar.vue";

export default {
  components: { AppBar, LoginAppBar },
  data() {
    return {
      userID: "",
      value: true,
      password: "",
      isLoading: false,
      isUser: false,
      dialog: false,
      message: {
        chip: false,
        text: "",
        color: "",
      },
      userIDCheck: [(v) => !!v || "User Name is required"],
      passwordcheck: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      let data = {
        userID: this.userID,
        password: this.password,
      };

      axios
        .post(`/ticketnow/api/v1/user/sign-in`, data)
        .then((response) => {
          this.verifyingOTP = false;
          if (response.status == 200) {
            this.isLoading = false;
            this.message.chip = true;
            this.message.text = "Email verified";
            this.message.color = "green";

            sessionStorage.setItem("token", response.data.token);
            sessionStorage.setItem("userID", response.data.result.userID);
            sessionStorage.setItem("email", response.data.result.email);
            sessionStorage.setItem("name", response.data.result.name);
            sessionStorage.setItem("id", response.data.result._id);

            if (response.data.result.type == "passenger") {
              this.$router.push("/passenger-dashboard");
            } else if (response.data.result.type == "manager") {
              this.$router.push("/manager-dashboard");
            }
          } else {
            this.isLoading = false;
            this.message.chip = true;
            this.message.text = "Login Failed";
            this.message.color = "red";
          }
        })
        .catch((err) => {
          this.isLoading = false;
          this.message.chip = true;
          this.message.text = "Login Failed";
          this.message.color = "red";

          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.subname {
  letter-spacing: 2px;
  /* font-family: Sans-serif; */
  font-size: 20px;
}
</style>
