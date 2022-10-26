import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import http from "./http";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  http: http,
  render: (h) => h(App),
}).$mount("#app");
