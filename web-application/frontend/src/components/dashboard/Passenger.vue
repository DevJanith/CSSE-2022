<template>
  <div class="pt-10 fill-height secondary">
    <passenger-app-bar />
    <div class="px-15">
      <v-row class="mb-5">
        <v-icon size="35">dashboard</v-icon>
        <h1 class="headingLarge ml-4">Passenger Dashboard</h1>
        <v-spacer></v-spacer>
        <v-btn
          class="ml-3 text-capitalize mt-3"
          color="warning"
          @click="goToTimetables()"
          >View Bus Timetable <v-icon class="ml-3">schedule</v-icon></v-btn
        >
      </v-row>

      <v-container class="pa-0 mb-8">
        <v-row class="my-10">
          <div class="titleLarge">
            <v-row class="ml-2">
              You have
              <div class="mx-3 primary--text">{{ credits }}</div>
              Credits available in your account
              <v-btn
                class="ml-3 text-capitalize white--text"
                color="#dc5353"
                @click="addcreditDialog = true"
                :loading="isLoading"
                >Add More Credit
                <v-icon class="ml-3">paid</v-icon>
              </v-btn>
            </v-row>
          </div>
        </v-row>
      </v-container>

      <v-row>
        <v-col cols="6">
          <PreviousJourneys />
        </v-col>
        <v-col cols="6"> <QRCode /> </v-col>
      </v-row>

      <!-- Add Credit -->

      <!-- Dialog -->
      <v-dialog v-model="addcreditDialog" width="700" persistent>
        <v-card>
          <v-card-title class="text-h5 primary white--text">
            Add Credit to Your Account
          </v-card-title>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container>
              <div>
                <p class="app-text">Credit/Debit Card Number</p>
                <v-text-field
                  label="Enter Card Number here"
                  outlined
                  v-model="creditCardNo"
                  :rules="creditCardRules"
                  dense
                  required
                ></v-text-field>
              </div>
              <div>
                <p class="app-text">Name on Card</p>
                <v-text-field
                  label="Enter Name Here"
                  outlined
                  v-model="name"
                  :rules="nameRules"
                  dense
                ></v-text-field>
              </div>
              <div>
                <p class="app-text">Card Expiration</p>
                <v-row class="mx-2">
                  <v-text-field
                    label="Enter Year"
                    outlined
                    v-model="year"
                    :rules="yearRules"
                    dense
                  ></v-text-field>
                  <v-text-field
                    label="Enter Month"
                    outlined
                    v-model="month"
                    :rules="monthRules"
                    dense
                  ></v-text-field>
                </v-row>
              </div>

              <div>
                <p class="app-text">Security Code</p>
                <v-text-field
                  label="CVC"
                  outlined
                  v-model="cvc"
                  :rules="cvcRules"
                  dense
                  @change="generateUsername()"
                ></v-text-field>
              </div>

              <div>
                <p class="app-text">Credit amount</p>
                <v-text-field
                  label="Enter the credit amount needed to be added to your account"
                  outlined
                  v-model="amount"
                  :rules="amountRules"
                  dense
                  @change="generateUsername()"
                ></v-text-field>
              </div>

              <v-divider></v-divider>
              <div class="">
                <v-row class="mt-3">
                  <v-col cols="6">
                    <v-btn
                      class="rounded-lg h5 primary--text text-capitalize mt-2"
                      width="100%"
                      outlined
                      @click="addcreditDialog = false"
                    >
                      <div class="btnText">Cancel</div></v-btn
                    >
                  </v-col>
                  <v-col cols="6">
                    <v-btn
                      :disabled="!valid"
                      color="primary"
                      width="100%"
                      class="rounded-lg h5 text-capitalize mt-2"
                      @click="addCredit"
                      :loading="isLoading"
                    >
                      <div class="btnText">Add Credit</div>
                    </v-btn>
                  </v-col>
                </v-row>
              </div>
            </v-container>
          </v-form>
        </v-card>
      </v-dialog>

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
import PassengerAppBar from "@/views/appbars/PassengerAppBar.vue";
import QRCode from "./passenger/QRCode.vue";
import PreviousJourneys from "./passenger/PreviousJourneys.vue";
import Timetable from "./passenger/Timetable.vue";
import axios from "axios";
export default {
  components: { PassengerAppBar, QRCode, PreviousJourneys, Timetable },

  data() {
    return {
      userID: sessionStorage.getItem("userID"),
      id: sessionStorage.getItem("id"),
      credits: "",
      addcreditDialog: false,
      creditCardNo: "",
      isLoading: false,
      message: {
        chip: false,
        text: "",
        color: "",
      },
      creditCardRules: [
        (v) => !!v || "Card Number is required",
        (v) =>
          /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.test(
            v
          ) || "Please enter valid card number",
      ],
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
      month: "",
      year: "",
      monthRules: [
        (v) => !!v || "Month is required",
        (v) => /^(0?[1-9]|1[012])$/.test(v) || "Please enter valid month",
      ],
      yearRules: [
        (v) => !!v || "Year is required",
        (v) => /^[12][0-9]{3}$/.test(v) || "Please enter valid year",
      ],
      cvc: "",
      cvcRules: [
        (v) => !!v || "CVC is required",
        (v) => /^[0-9]{3}$/.test(v) || "Please enter valid CVC number",
      ],
      amount: "",
      amountRules: [
        (v) => !!v || "CVC is required",
        (v) => /^[0-9]*$/.test(v) || "Please enter valid credit amount",
      ],
      valid: true,
    };
  },

  methods: {
    addCredit() {
      const isValid = this.$refs.form.validate();
      this.isLoading = true;

      if (isValid) {
        const data = {
          userID: this.userID,
          amount: Number(this.amount),
        };
        this.addcreditDialog = false;

        axios
          .post(`/ticketnow/api/v1/user/add-credit`, data)
          .then((response) => {
            this.isLoading = false;

            if (response.status == 201 || response.status == 200) {
              this.message.chip = true;
              this.message.text = "Credit added to your account.";
              this.message.color = "green";

              this.$refs.form.reset();
              this.getUserData();
            } else {
              this.message.chip = true;
              this.message.text = "Failed to add credit to your account";
              this.message.color = "red";
            }
          })
          .catch((err) => {
            console.log(err);
            this.isLoading = false;
            this.message.chip = true;
            this.message.text = "Something went wrong!";
            this.message.color = "red";
          });
      } else {
        this.isLoading = false;
        this.message.chip = true;
        this.message.text = "Please Fill Details Correctly";
        this.message.color = "red";
      }
    },
    goToTimetables() {
      this.$router.push("/timetables");
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
