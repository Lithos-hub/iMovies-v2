import { createApp } from "vue";
import "./index.css";
import "./scss/app.scss";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

createApp(App).use(router).use(createPinia()).mount("#app");
