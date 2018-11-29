import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import "./plugins/vuetify";
import App from "./App.vue";
import Login from "./components/Login.vue";
import SignUp from "./components/SignUp.vue";
import Home from "./components/Home.vue";

Vue.config.productionTip = false;

Vue.use(Router);

const config = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SEND_ID'
};


firebase.initializeApp(config);

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

firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount("#app");
});

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let isAuth = to.matched.some(record => record.meta.requiresAuth);

  if (isAuth && !currentUser) {
    next("login");
  } else if (!isAuth && currentUser) {
    next("home");
  } else {
    next();
  }
});
