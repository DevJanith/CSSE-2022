import axios from "axios";
import Vue from "vue";

axios.defaults.baseURL = "http://localhost:5000";

Vue.use(axios);

export default {};
