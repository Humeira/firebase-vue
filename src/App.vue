<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light">Demo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat target="_blank" v-show="!user">
        <router-link to="/login">Login</router-link>
      </v-btn>
      <v-btn flat target="_blank">
        <router-link to="/home">Books Collection</router-link>
      </v-btn>
      <v-btn flat @click="out" v-show="user">
       <span>Sign out</span>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <v-layout text-xs-center align-center justify-center row fill-height>
          <v-img
            :src="require('./assets/logo-firebase.png')"
            class="my-3 img-right"
            contain
            height="100"
          ></v-img>
          <span class="display-2">+</span>
          <v-img :src="require('./assets/logo.png')" class="my-3 img-left" contain height="100"></v-img>
        </v-layout>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer dark height="auto">
      <v-card class="flex" flat tile>
        <v-card-actions class="blue justify-center">
          &copy;2018 —
          <strong>Humeira Diljore</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>
<style scope>
.img-left,
.img-right {
  margin: 0 20px;
}

.img-left .v-image__image {
  background-position: left !important;
}

.img-right .v-image__image {
  background-position: right !important;
}

.v-btn {
  margin: 10px 0;
}
</style>

<script>
import {firebaseInstace} from "./firebaseConfig.js";
export default {
  name: "App",
  data() {
    return {
      user: ""
    }
  },
  created() {
    firebaseInstace.auth().currentUser ? (this.user = true) : (this.user = false);

  },
  methods : {
    out: function () {
       firebaseInstace.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
};
</script>
