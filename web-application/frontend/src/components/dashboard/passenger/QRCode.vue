<template>
  <div>
    <v-card
      min-height="300"
      min-width="300"
      max-height="500"
      elevation="14"
      rounded="true"
      class="pa-7"
    >
      <v-row>
        <v-col cols="5">
          <v-row class="mb-5">
            <v-icon size="30">qr_code_2</v-icon>

            <h1 class="heading ml-4">QR Code Token</h1>
          </v-row>
          <div ref="printcontent">
            <VueQRCodeComponent :text="userID"></VueQRCodeComponent>
          </div>
        </v-col>
        <v-col cols="7">
          <v-btn
            @click="printThis"
            class="text-capitalize mt-10"
            color="green"
            width="250"
            height="50"
            ><div class="white--text">Download QR Code</div>
            <v-icon right dark color="white"> download </v-icon></v-btn
          >
          <p class="text-left otpText mt-10">User ID : {{ this.userID }}</p>
          <p class="text-left otpText mt-10">
            <v-icon>info</v-icon>
            Use this QR code to scan at the starting point of your journey and
            ending point of your journey.
          </p>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import VueQRCodeComponent from "vue-qrcode-component";
import html2canvas from "html2canvas";

export default {
  components: { VueQRCodeComponent },
  data() {
    return {
      userID: sessionStorage.getItem("userID"),
    };
  },

  methods: {
    async printThis() {
      console.log("printing..");
      const el = this.$refs.printcontent;

      const options = {
        type: "dataURL",
      };
      const printCanvas = await html2canvas(el, options);

      const link = document.createElement("a");
      link.setAttribute("download", `${this.userID}.png`);
      link.setAttribute(
        "href",
        printCanvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream")
      );
      link.click();

      console.log("done");
    },
  },
};
</script>

<style scoped>
.otpText {
  font-size: 17px;
  font-family: "Quicksand", sans-serif;
  font-weight: 700;
}
</style>
