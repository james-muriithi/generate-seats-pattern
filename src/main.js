import { createApp } from "vue";
import App from "./App.vue";

//bootstrap
import("bootstrap");
import "vue-universal-modal/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import VueUniversalModal from "vue-universal-modal";

const app = createApp(App);

app.use(VueUniversalModal, {
  teleportTarget: "body"
});

app.mount("#app");
