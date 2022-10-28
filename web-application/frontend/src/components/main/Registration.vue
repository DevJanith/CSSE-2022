<template>
  <div>
    <login-app-bar />
    <div class="fill-height secondary">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="8">
            <v-card class="pb-10 mt-4 pr-8" elevation="10">
              <div>
                <center>
                  <img
                    src="../../assets/logo.png"
                    alt=""
                    width="150"
                    class="mt-4"
                  />
                </center>
                <!-- <p class="primary--text ml-10 subname">CFI DASHBOARD</p> -->

                <div class="ml-10">
                  <h1 class="app-text">User Registration</h1>
                </div>
                <div class="ml-8">
                  <v-form ref="form" @submit.prevent="registerUser">
                    <v-container>
                      <v-row class="ml-1 mb-3">
                        <v-switch
                          v-model="switchUserType"
                          inset
                          label="User Type : "
                        ></v-switch>
                        <h3 v-if="switchUserType" class="ml-3 mt-5">
                          Local User
                        </h3>
                        <h3 v-else class="ml-3 mt-4">Foreigner</h3>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <div v-if="switchUserType">
                            <p class="app-text">NIC</p>
                            <v-text-field
                              label="Please Enter NIC here"
                              outlined
                              v-model="id"
                              :rules="nicRules"
                              dense
                            ></v-text-field>
                          </div>
                          <div v-else>
                            <p class="app-text">Passport Number</p>
                            <v-text-field
                              label="Please Enter passport number here"
                              outlined
                              v-model="id"
                              :rules="passportRules"
                              dense
                            ></v-text-field>
                          </div>
                          <div>
                            <p class="app-text">Email</p>
                            <v-text-field
                              label="Please Enter email here"
                              outlined
                              v-model="email"
                              :rules="emailRules"
                              dense
                            ></v-text-field>
                          </div>
                          <div>
                            <p class="app-text">Mobile Number</p>
                            <v-text-field
                              label="Ex :- 07xxxxxxxx"
                              outlined
                              v-model="mobileNumber"
                              :rules="phoneNumberRules"
                              dense
                            ></v-text-field>
                          </div>

                          <div>
                            <p class="app-text">Name</p>
                            <v-text-field
                              label="Enter your name here"
                              outlined
                              v-model="name"
                              :rules="userNameCheck"
                              dense
                            ></v-text-field>
                          </div>
                        </v-col>
                        <v-col cols="6">
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
                          <div>
                            <p class="app-text">Confirm Password</p>
                            <v-text-field
                              outlined
                              label="Confirm Password"
                              v-model="confirmPassword"
                              :rules="confirmPasswordCheck"
                              @click:append="() => (value = !value)"
                              :type="value ? 'password' : 'text'"
                              :append-icon="value ? 'mdi-eye-off' : 'mdi-eye'"
                              dense
                            ></v-text-field>
                          </div>

                          <div class="mt-3">
                            <v-btn
                              color="primary"
                              width="100%"
                              class="text-capitalize"
                              type="submit"
                              :loading="registerBtnLoading"
                              :disabled="registerBtn"
                              >Register</v-btn
                            >
                          </div>

                          <!-- OTP Input Field -->

                          <div class="mt-4" style="max-width: 300px">
                            <center>
                              <p
                                class="text-left otpText"
                                v-show="showOTPField"
                              >
                                Your one time password has been sent to your
                                email address. Please enter the number below.
                              </p>
                              <v-row>
                                <v-col cols="11">
                                  <v-otp-input
                                    v-show="showOTPField"
                                    v-model="otp"
                                    :disabled="verifyingOTP"
                                    @finish="checkOTP"
                                    length="4"
                                    type="number"
                                  ></v-otp-input
                                ></v-col>
                                <v-col cols="1"
                                  ><v-btn
                                    v-show="showOTPField"
                                    small
                                    color="#dc5353"
                                    class="white--text ml-3 mt-4"
                                    @click="clearOTP()"
                                  >
                                    Clear
                                  </v-btn></v-col
                                >
                              </v-row>
                              <v-progress-circular
                                v-show="verifyingOTP"
                                indeterminate
                                color="primary"
                              ></v-progress-circular>

                              <v-row
                                v-show="otpSuccess"
                                align="center"
                                justify="center"
                                class="otpVerifiedText mt-3"
                              >
                                <div class="green--text">OTP Verified</div>
                                <v-icon color="green" class="ml-3"
                                  >check_circle</v-icon
                                >

                                <br />
                                <p
                                  class="text-left otpText mt-4"
                                  v-show="otpSuccess"
                                ></p>
                              </v-row>
                              <v-row class="otpText" v-show="otpSuccess">
                                Please login to the system
                                <v-btn
                                  color="primary"
                                  class="text-capitalize"
                                  @click="goTologin()"
                                  width="100%"
                                >
                                  Go to Login Page
                                </v-btn>
                              </v-row>
                              <v-row
                                v-show="otpFailed"
                                align="center"
                                justify="center"
                                class="otpVerifiedText mt-3"
                                ><div class="red--text">
                                  OTP Verification Failed
                                </div>
                                <v-icon color="red" class="ml-3">error</v-icon>
                              </v-row>
                            </center>
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-form>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-snackbar
        v-model="message.chip"
        top
        rounded="pill"
        :color="message.color"
        ><div class="text-center">
          {{ message.text }}
        </div>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LoginAppBar from "@/views/appbars/LoginAppBar.vue";

export default {
  components: { LoginAppBar },
  data() {
    return {
      value: true,
      valid: true,
      password: "",
      isLoading: false,
      isUser: false,
      dialog: false,
      confirmPassword: "",
      registerBtnLoading: false,
      message: {
        chip: false,
        text: "",
        color: "",
      },
      id: "",
      email: "",
      mobileNumber: "",
      name: "",
      switchUserType: true,
      showOTPField: false,
      verifyingOTP: false,
      otpSuccess: false,
      otpFailed: false,
      registerBtn: false,
      otp: "",
      storedID: "",
      passportRules: [
        (v) => !!v || "NIC is required",
        (v) =>
          /^[A-PR-WYa-pr-wy][1-9]\\d\\s?\\d{4}[1-9]$/.test(v) ||
          "Please enter valid passport number",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      nicRules: [
        (v) => !!v || "NIC is required",
        (v) =>
          /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/.test(v) || "Please enter valid NIC",
      ],
      phoneNumberRules: [
        (v) => !!v || "mobile number is required",
        (v) =>
          /^(\+\d{1,3}[- ]?)?\d{10}$/.test(v) ||
          "Please enter valid mobile number",
      ],
      userNameCheck: [(v) => !!v || "User Name is required"],

      passwordcheck: [(v) => !!v || "Password is required"],
      confirmPasswordCheck: [
        (value) =>
          value === this.password ||
          "The password confirmation does not match.",
      ],
    };
  },
  methods: {
    goTologin() {
      this.$router.push("/");
    },
    clearOTP() {
      this.otp = "";
    },

    checkOTP() {
      this.verifyingOTP = true;
      this.otpSuccess = false;
      this.otpFailed = false;
      let data = {
        userID: this.storedID,
        otp: this.otp,
      };

      axios
        .post(`/ticketnow/api/v1/user/check-otp`, data)
        .then((response) => {
          this.verifyingOTP = false;
          if (response.status == 200) {
            this.otpSuccess = true;
            this.message.chip = true;
            this.message.text = "Email verified";
            this.message.color = "green";
            // this.$router.push("/password-reset/" + response.data.commonValue);
          } else {
            this.otpFailed = true;
            this.message.chip = true;
            this.message.text = "Email verification failed";
            this.message.color = "red";
          }
        })
        .catch((err) => {
          this.verifyingOTP = false;
          this.otpFailed = true;
          this.message.chip = true;

          this.message.text = "Something Went Wrong!";
          this.message.color = "red";

          console.log(err);
        });
    },

    registerUser() {
      let valid = this.$refs.form.validate();

      if (valid) {
        let data = {
          userID: this.id,
          email: this.email,
          password: this.password,
          mobileNo: this.mobileNumber,
          name: this.name,
          type: "passenger",
        };
        this.storedID = this.id;
        this.registerBtnLoading = true;
        axios
          .post(`/ticketnow/api/v1/user/sign-up`, data)
          .then((response) => {
            this.registerBtnLoading = false;
            if (response.status == 200) {
              this.message.chip = true;
              this.message.text = "Registration Succesfull";
              this.message.color = "green";

              this.showOTPField = true;
              this.registerBtn = true;
            } else {
              this.registerBtnLoading = false;
              this.message.chip = true;
              this.message.text = "Registration Error";
              this.message.color = "red";
              this.registerBtn = false;
            }
          })
          .catch((err) => {
            this.registerBtnLoading = false;
            this.message.chip = true;
            this.message.text = "Something Went Wrong!";
            this.message.color = "red";
            this.registerBtn = false;
            console.log(err);
          });
      } else {
        this.message.chip = true;
        this.message.text = "Please Enter Details!";
        this.message.color = "red";
        this.registerBtnLoading = false;
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
.otpText {
  font-size: 17px;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
}

.resetCard {
  position: absolute;
  top: 20%;
}

.otpVerifiedText {
  font-size: 17px;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
}
</style>
