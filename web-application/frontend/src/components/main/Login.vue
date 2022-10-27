<template>
  <div class="fill-height secondary">
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="5">
          <v-card class="pb-10 mt-4 pr-8" elevation="10">
            <div>
              <center>
                <img
                  src="../../assets/logo.png"
                  alt=""
                  width="150"
                  class="mt-16 ml-10"
                />
              </center>
              <!-- <p class="primary--text ml-10 subname">CFI DASHBOARD</p> -->

              <div class="ma-10">
                <h1 class="app-text">Login</h1>
              </div>
              <div class="ml-8">
                <v-form ref="form" @submit.prevent="login">
                  <v-container>
                    <div>
                      <p class="app-text">User Name</p>
                      <v-text-field
                        label="Username"
                        outlined
                        v-model="userName"
                        :rules="userNameCheck"
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
    <div class="text-center">
      <v-dialog v-model="dialog" width="500" persistent>
        <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
            Click Me
          </v-btn>
        </template> -->

        <v-card>
          <v-card-title class="text-h5 primary white--text">
            The user is already logged in!
          </v-card-title>

          <v-card-text class="mt-2"> Are you sure to login? </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green" @click="logToTheSystem" class="mr-5" outlined>
              Yes
            </v-btn>
            <v-btn color="red" @click="dialog = false" outlined> No </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      userName: "",
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
      userNameCheck: [(v) => !!v || "User Name is required"],
      passwordcheck: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    logToTheSystem() {
      const isValid = this.$refs.form.validate();

      if (isValid) {
        this.isLoading = true;

        const data = {
          username: this.userName,
          password: this.password,
        };
        console.log(data);
        axios
          //.post(`/vxSafenet/api/v1/auth/login-user`, data)
          .post(`/api/auth/sign-in`, data)
          .then((response) => {
            this.isLoading = false;

            console.log("LoginPage");
            // console.log(response.data.privileges);
            if (response.status === 200) {
              console.log(response.data);

              this.token = response.data.accessToken;
              sessionStorage.setItem("role", response.data.userRole);

              sessionStorage.setItem("username", data.username);

              sessionStorage.setItem("tokenLocal", this.token);
              sessionStorage.setItem("privileges", response.data.privileges);
              this.$store.commit("setAuthentication", true);
              this.$store.commit("setPrivileges", response.data.privileges);

              console.log(this.$store.state.authenticated);

              if (response.data.userStatus == 1) {
                this.$router.push(
                  "/first-time-login/" + response.data.username
                );
              } else {
                this.$router.push("/dashboard");
              }

              this.message.chip = false;
            } else {
              this.message.chip = true;
              this.message.text = response.data;
              this.message.color = "primary";

              console.log(response);
              this.$store.commit("setAuthentication", false);
              this.$store.commit("setPrivileges", []);
            }
          })
          .catch((error) => {
            (error) => (this.status = error.response.data.status);
            this.isLoading = false;
            this.message.chip = true;
            this.message.text = error.response.data;
            this.message.color = "red";
            console.log(error);
            this.$store.commit("setAuthentication", false);
            this.$store.commit("setPrivileges", []);
          });
      }
    },
    async login() {
      const isValid = await this.$refs.form.validate();

      if (isValid) {
        this.isLoading = true;

        const data = {
          username: this.userName,
          password: this.password,
        };
        console.log(data);
        axios
          //.post(`/vxSafenet/api/v1/auth/login-user`, data)
          .post(`/api/auth/check-login`, data)
          .then((response) => {
            this.isLoading = false;

            console.log("LoginPage");
            // console.log(response.data.privileges);
            if (response.status === 200) {
              if (response.data === true) {
                this.dialog = true;
              } else {
                this.dialog = false;
                this.isLoading = true;
                axios
                  //.post(`/vxSafenet/api/v1/auth/login-user`, data)
                  .post(`/api/auth/sign-in`, data)
                  .then((response) => {
                    this.isLoading = false;

                    console.log("LoginPage");
                    // console.log(response.data.privileges);
                    if (response.status === 200) {
                      this.isLoading = false;
                      console.log(response.data);

                      this.token = response.data.accessToken;
                      // window.localStorage.setItem(
                      //   "role",
                      //   response.data.userRole
                      // );

                      // window.localStorage.setItem("username", data.username);
                      sessionStorage.setItem("role", response.data.userRole);

                      sessionStorage.setItem("username", data.username);

                      sessionStorage.setItem("tokenLocal", this.token);
                      sessionStorage.setItem(
                        "privileges",
                        response.data.privileges
                      );
                      this.$store.commit("setAuthentication", true);
                      this.$store.commit(
                        "setPrivileges",
                        response.data.privileges
                      );

                      console.log(this.$store.state.authenticated);
                      if (response.data.userStatus == 1) {
                        this.$router.push(
                          "/first-time-login/" + response.data.username
                        );
                      } else {
                        this.$router.push("/dashboard");
                      }

                      this.message.chip = false;
                    } else {
                      this.message.chip = true;
                      this.message.text =
                        "Please Enter Valid user name or password";
                      this.message.color = "primary";

                      console.log(response);
                      this.$store.commit("setAuthentication", false);
                      this.$store.commit("setPrivileges", []);
                    }
                  })
                  .catch((error) => {
                    (error) => (this.status = error.response.data.status);
                    this.isLoading = false;
                    this.message.chip = true;
                    this.message.text = error.response.data;
                    this.message.color = "red";
                    console.log(error);
                    this.$store.commit("setAuthentication", false);
                    this.$store.commit("setPrivileges", []);
                  });
                this.message.chip = false;
              }
            } else {
              this.message.chip = true;
              this.message.text = response.data;
              this.message.color = "primary";

              console.log(response);
              this.$store.commit("setAuthentication", false);
              this.$store.commit("setPrivileges", []);
            }
          })
          .catch((error) => {
            (error) => (this.status = error.response.data.status);
            this.isLoading = false;
            this.message.chip = true;
            this.message.text = "Please Enter Valid user name or password";
            this.message.color = "red";
            console.log(error);
            this.$store.commit("setAuthentication", false);
            this.$store.commit("setPrivileges", []);
          });

        // .catch((error) => {
        //   (error) => (this.status = error.response.data.status);
        //   console.log(error.response.data);
        //   console.log(error.response.status);
        //   console.log(error.response.headers);
        // });
      }
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
