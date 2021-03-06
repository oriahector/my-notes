import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/tailwind.css";

// Load JSON notes
// import notes from "@/seed.json";
// store.commit("setNotes", notes);

// Check auth process
store.dispatch("checkAuth");

createApp(App).use(store).mount("#app");
