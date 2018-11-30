import Vue from "vue";
import Router from "vue-router";
import {firebaseInstance} from "./firebaseConfig";

import "./plugins/vuetify";
import App from "./App.vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Home from "./components/Home.vue";

Vue.config.productionTip = false;

Vue.use(Router);


const router = new Router({
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/sign-up",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

firebaseInstance.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
});

router.beforeEach((to, from, next) => {
  let currentUser = firebaseInstance.auth().currentUser;
  let isAuth = to.matched.some(record => record.meta.requiresAuth);

  if (isAuth && !currentUser) {
    next("login");
  } else if (!isAuth && currentUser) {
    next("home");
  } else {
    next();
  }
});
