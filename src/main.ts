import { createApp } from "vue";
import "./index.css";
import "./scss/app.scss";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import pinia from "./stores";

createApp(App).use(pinia).use(router).use(VueAxios, axios).mount("#app");
