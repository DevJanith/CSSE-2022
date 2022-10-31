<template>
  <div class="px-15 secondary">
    <v-row class="my-5">
      <v-icon size="35">schedule</v-icon>
      <h1 class="headingLarge ml-4">Manage Timetables</h1>
      <v-spacer></v-spacer>
      <v-btn
        color="blue"
        class="mt-2 white--text text-capitalize"
        @click="AddDialog = true"
        >Add Item for Timetable

        <v-icon>add</v-icon></v-btn
      >
    </v-row>

    <v-card
      min-height="450"
      min-width="300"
      max-height="800"
      elevation="14"
      rounded="true"
      class="pa-7 fill-height mb-10"
    >
      <v-row class="mb-5">
        <v-container fluid>
          <v-data-table
            class="app-text tableText secondary table dataTable"
            :headers="headers"
            :items="tableData"
            :loading="tableLoading"
            loading-text
            :footer-props="footerProps"
          >
            <!-- header -->
            <template v-slot:[`header.dateTime`]="{ header }">
              <v-icon small class="mr-1 mb-1">calendar_month</v-icon
              >{{ header.text }}
            </template>

            <template v-slot:[`header.busNO`]="{ header }">
              <v-icon small class="mr-1 mb-1">airport_shuttle</v-icon
              >{{ header.text }}
            </template>

            <template v-slot:[`header.location`]="{ header }">
              <v-icon small class="mr-1 mb-1">pin_drop</v-icon>{{ header.text }}
            </template>

            <template v-slot:[`header.startLocation`]="{ header }">
              <v-icon small class="mr-1 mb-1">start</v-icon>{{ header.text }}
            </template>

            <template v-slot:[`header.endLocation`]="{ header }">
              <v-icon small class="mr-1 mb-1">flag</v-icon>{{ header.text }}
            </template>

            <template v-slot:[`header.fare`]="{ header }">
              <v-icon small class="mr-1 mb-1">paid</v-icon>{{ header.text }}
            </template>

            <!-- data -->
            <!-- <template v-slot:[`item.month`]="{ item }">
              <div>
                <router-link
                  class-active="active"
                  :to="'/monthly-active-subscribers/' + item.month"
                  >{{ convertMonth(item.month) }}</router-link
                >
              </div>
            </template> -->
            <template v-slot:[`item.controls`]="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    small
                    color="error"
                    @click="opendeleteDialog(item)"
                    :disabled="item.accountStatus == 0"
                    class="text-capitalize"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon dark>delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    fab
                    small
                    color="warning"
                    class="ml-5 text-capitalize"
                    @click="openEditDialog(item)"
                    :disabled="item.accountStatus == 0"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </v-container>
      </v-row>
    </v-card>
    <!-- Add Timetable -->

    <v-dialog v-model="AddDialog" width="50%" persistent>
      <v-card>
        <v-card-title class="text-h5 primary white--text">
          Add Timetable
        </v-card-title>

        <v-form ref="addForm" v-model="valid" lazy-validation>
          <v-container>
            <div>
              <p class="app-text">Bus Number</p>
              <v-text-field
                label="Enter Bus Number"
                outlined
                v-model="busNo_add"
                :rules="busNoRules"
                dense
                required
              ></v-text-field>
            </div>
            <div>
              <p class="app-text">Select Date and Time</p>
              <v-row>
                <v-col>
                  <v-dialog
                    ref="dateDialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        v-model="date"
                        :rules="dateRules"
                        label="Select Date"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dateDialog.save(date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col>
                  <v-dialog
                    ref="dialog"
                    v-model="modal2"
                    :return-value.sync="time"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        :rules="timeRules"
                        v-model="time"
                        label="Select Time"
                        append-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker v-if="modal2" v-model="time" full-width>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal2 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(time)"
                      >
                        OK
                      </v-btn>
                    </v-time-picker>
                  </v-dialog></v-col
                >
              </v-row>
            </div>
            <div>
              <p class="app-text">Enter Bus Stand Location</p>
              <v-text-field
                label="Enter Location"
                outlined
                v-model="busStand_add"
                :rules="locationRules"
                dense
              ></v-text-field>
            </div>
            <div>
              <p class="app-text">Bus Start Location</p>
              <v-text-field
                label="Enter Location"
                outlined
                v-model="startLocation_add"
                :rules="locationRules"
                dense
              ></v-text-field>
            </div>
            <div>
              <p class="app-text">Bus End Location</p>
              <v-text-field
                label="Enter Location"
                outlined
                v-model="endLocation_add"
                :rules="locationRules"
                dense
              ></v-text-field>
            </div>
            <div>
              <p class="app-text">Travelling Root</p>
              <v-text-field
                label="Enter Travelling Root"
                outlined
                v-model="travellingRoot_add"
                :rules="locationRules"
                dense
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
                    @click="AddDialog = false"
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
                    @click="addTimetable()"
                    :loading="isLoading"
                  >
                    <div class="btnText">Add Timetable</div>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Dialog -->
    <v-dialog v-model="EditDialog" width="50%" persistent>
      <v-card>
        <v-card-title class="text-h5 primary white--text">
          Edit Timetable
        </v-card-title>

        <v-form ref="editForm" v-model="valid" lazy-validation>
          <v-container>
            <div>
              <p class="app-text">Bus Number</p>
              <v-text-field
                label="Enter Bus Number"
                outlined
                v-model="busNo"
                :rules="busNoRules"
                dense
                required
              ></v-text-field>
            </div>
            <div>
              <p class="app-text">Select Date and Time</p>
              <v-row>
                <v-col>
                  <v-dialog
                    ref="dateDialog"
                    v-model="modal"
                    :return-value.sync="date"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        v-model="date"
                        :rules="dateRules"
                        label="Select Date"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dateDialog.save(date), (this.date = date)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col>
                  <v-dialog
                    ref="dialog"
                    v-model="modal2"
                    :return-value.sync="time"
                    persistent
                    width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        :rules="timeRules"
                        v-model="time"
                        label="Select Time"
                        append-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker v-if="modal2" v-model="time" full-width>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal2 = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.dialog.save(time), (this.time = time)"
                      >
                        OK
                      </v-btn>
                    </v-time-picker>
                  </v-dialog></v-col
                >
              </v-row>
            </div>
            <div>
              <p class="app-text">Enter Bus Stand Location</p>
              <v-text-field
                label="Enter Location"
                outlined
                v-model="busStand"
                :rules="locationRules"
                dense
              ></v-text-field>
            </div>
            <div>
              <p class="app-text">Bus Start Location</p>
              <v-text-field
                label="Enter Location"
                outlined
                v-model="startLocation"
                :rules="locationRules"
                dense
              ></v-text-field>
            </div>
            <div>
              <p class="app-text">Bus End Location</p>
              <v-text-field
                label="Enter Location"
                outlined
                v-model="endLocation"
                :rules="locationRules"
                dense
              ></v-text-field>
            </div>
            <div>
              <p class="app-text">Travelling Root</p>
              <v-text-field
                label="Enter Travelling Root"
                outlined
                v-model="travellingRoot"
                :rules="locationRules"
                dense
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
                    @click="EditDialog = false"
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
                    @click="updateItem()"
                    :loading="isLoading"
                  >
                    <div class="btnText">Update</div>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>

    <confirm-dialog
      v-if="confrimDeleteDialog.show"
      :message="confrimDeleteDialog.message"
      :message1="confrimDeleteDialog.message1"
      :buttonText="confrimDeleteDialog.buttonText"
      @close-alert="confrimDeleteDialog.show = false"
      @confirm-alert="deleteItem()"
    />
    <v-snackbar v-model="message.chip" top rounded="pill" :color="message.color"
      ><div class="text-center">
        {{ message.text }}
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import VueJsonToCsv from "vue-json-to-csv";
import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
import moment from "moment";
export default {
  components: { VueJsonToCsv, ConfirmDialog },
  data() {
    return {
      footerProps: { "items-per-page-options": [5, 10] },
      tableLoading: false,
      totalAmount: "",
      EditDialog: false,
      AddDialog: false,
      editTimetable: {},
      time: null,
      menu2: false,
      modal2: false,
      date: moment().format("YYYY-MM-DD"),
      menu: false,
      modal: false,
      menu2: false,
      valid: true,
      message: {
        chip: false,
        text: "",
        color: "",
      },

      //form data

      busNo: "",
      busStand: "",
      startLocation: "",
      endLocation: "",
      travellingRoot: "",

      locationRules: [(v) => !!v || "This field can not be empty."],
      busNoRules: [(v) => !!v || "Bus Number should not be empty."],
      dateRules: [(v) => !!v || "Date can not be empty."],
      timeRules: [(v) => !!v || "Time can not be empty."],

      // add form
      busNo_add: "",
      busStand_add: "",
      startLocation_add: "",
      endLocation_add: "",
      travellingRoot_add: "",

      confrimDeleteDialog: {
        show: false,
        message: "Warning!",
        message1: "Do you want to delete this item from the timetable?",
        buttonText: "Ok",
      },

      deleteItemID: "",
      editItemID: "",
      headers: [
        {
          text: "Bus No",
          align: "start",
          filterable: false,
          value: "busNO",
          class: "white",
        },

        {
          text: "Date",
          align: "start",
          value: "dateTime",
          class: "white",
        },
        {
          text: "Location",
          align: "start",
          value: "location",
          class: "white",
        },
        {
          text: "Start Location",
          value: "startLocation",
          align: "start",
          class: "white",
        },
        {
          text: "End Location",
          value: "endLocation",
          align: "start",
          class: "white",
        },
        {
          text: "Travelling Root",
          value: "travelingRoot",
          align: "start",
          class: "white",
        },
        {
          text: "Controls",
          align: "center",
          class: "white",
          value: "controls",
          sortable: false,
        },
      ],

      tableData: [],
    };
  },

  methods: {
    opendeleteDialog(item) {
      this.confrimDeleteDialog.show = true;
      this.deleteItemID = item._id;
    },

    // Delete Item
    deleteItem() {
      axios
        .delete(`/ticketnow/api/v1/transport/${this.deleteItemID}`)
        .then((response) => {
          this.confrimDeleteDialog.show = false;
          if (response.status == 200) {
            this.message.chip = true;
            this.message.text = "Successfully deleted item from timetable.";
            this.message.color = "green";

            this.getTimetableData();
          } else {
            this.message.chip = true;
            this.message.text = `Failed to delete item`;
            this.message.color = "orange";
          }
        })
        .catch((err) => {
          console.log(err);
          this.confrimDeleteDialog.show = true;
          this.message.chip = true;
          this.message.text = `Failed to delete item`;
          this.message.color = "orange";
        });
    },

    // Add Item for Timetable
    addTimetable() {
      const isValid = this.$refs.addForm.validate();

      if (isValid) {
        this.AddDialog = false;
        const data = {
          busNO: this.busNo_add,
          dateTime: this.date + " " + this.time,
          location: this.busStand_add,
          travelingRoot: this.travellingRoot_add,
          startLocation: this.startLocation_add,
          endLocation: this.endLocation_add,
        };

        axios
          .post("/ticketnow/api/v1/transport/", data)
          .then((response) => {
            console.log(response);

            if (response.status == 201 || response.status == 200) {
              this.message.chip = true;
              this.message.text = "Added to timetable";
              this.message.color = "green";

              this.$refs.addForm.reset();
              this.getTimetableData();
            } else {
              this.message.chip = true;
              this.message.text = "Failed to add item to Timetable";
              this.message.color = "orange";
            }
          })
          .catch((err) => {
            console.log(err);

            this.message.chip = true;
            this.message.text = "Something Went Wrong!";
            this.message.color = "orange";
          });
      } else {
        this.message.chip = true;
        this.message.text = "Please Fill Details Correctly";
        this.message.color = "orange";
      }
    },

    // Update item in table
    updateItem() {
      const isValid = this.$refs.editForm.validate();

      if (isValid) {
        this.EditDialog = false;
        const data = {
          busNO: this.busNo,
          dateTime: this.date + " " + this.time,
          location: this.busStand,
          travelingRoot: this.travellingRoot,
          startLocation: this.startLocation,
          endLocation: this.endLocation,
        };

        axios
          .patch(`/ticketnow/api/v1/transport/${this.editItemID}`, data)
          .then((response) => {
            console.log(response);

            if (response.status == 201 || response.status == 200) {
              this.message.chip = true;
              this.message.text = "Succesfully updated the record!";
              this.message.color = "green";

              this.$refs.editForm.reset();
              this.getTimetableData();
            } else {
              this.message.chip = true;
              this.message.text = "Failed to update record";
              this.message.color = "orange";
            }
          })
          .catch((err) => {
            console.log(err);

            this.message.chip = true;
            this.message.text = "Something Went Wrong!";
            this.message.color = "orange";
          });
      } else {
        this.message.chip = true;
        this.message.text = "Please Fill Details Correctly";
        this.message.color = "orange";
      }
    },
    openEditDialog(item) {
      this.EditDialog = true;
      this.editTimetable = item;

      this.editItemID = item._id;

      this.busNo = item.busNO;
      this.busStand = item.location;
      this.startLocation = item.startLocation;
      this.endLocation = item.endLocation;
      this.travellingRoot = item.travelingRoot;

      this.date = item.dateTime.slice(0, 10);
      this.time = item.dateTime.slice(11, 16);
    },
    getTimetableData() {
      this.tableLoading = true;
      const id = sessionStorage.getItem("id");
      axios
        .get(`/ticketnow/api/v1/transport`)
        .then((response) => {
          this.tableLoading = false;

          if (response.status == 200) {
            this.tableData = response.data;
            this.totalAmount = response.data.totalAmount;
          }
        })
        .catch((err) => {
          console.log(err);
          this.tableLoading = false;
        });
    },
  },

  mounted() {
    this.getTimetableData();
  },
};
</script>

<style scoped>
.tableText {
  font-weight: 550;
}
.tableData {
  display: flex;
  align-items: flex-start;
}

.label-top {
  font-weight: 500;
}
.table >>> th {
  font-size: 17px !important;
}
.table >>> tr > td {
  font-size: 16px !important;
}

.table >>> .v-data-footer__select,
.table >>> .v-select__selection,
.table >>> .v-data-footer__pagination {
  font-size: 16px;
}
/* .dataTable {
  max-width: 1100px;
} */
.download {
  cursor: pointer;
}
.downloadText {
  font-size: 20px;
}
</style>
