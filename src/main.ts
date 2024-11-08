import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createWebHistory, createRouter } from "vue-router";
import Homepage from "./components/Homepage.vue";
import RecipeDetail from "./components/RecipeDetail.vue";
import Favorite from "./components/Favorite.vue";
import Error404 from "./components/Error404.vue";

const routes = [
  { path: "/", component: Homepage, name: "home" },
  {
    path: "/recipe/:name",
    component: RecipeDetail,
    name: "recipe-detail",
  },
  { path: "/favorite", name: "favorite", component: Favorite },
  { path: "/:pathMatch(.*)", name: "error-404", component: Error404 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(router).mount("#app");
