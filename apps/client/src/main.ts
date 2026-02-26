import { createPinia } from "pinia";
import { createApp, markRaw } from "vue";

import "./style.css";
import "vue-sonner/style.css";
import App from "./App.vue";
import router from "./router";
import { APPNAME } from "./constants";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.mount("#app");

document.title = APPNAME;
