<template>
    <v-container>
        <v-layout row align-center justify-center fill-height>
            <v-flex xs6>
                <v-card-text>
                    <p class="text-xs-center headline font-weight-bold">Sign In</p>
                </v-card-text>
                <v-text-field v-model="email" label="E-mail" required></v-text-field>
                <v-text-field
                    v-model="password"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                ></v-text-field>
                <v-btn color="info" @click.prevent="login" large ripple text-center>Login</v-btn>
                           <p class="text-center">If you don't have an account, <router-link to="/sign-up"> sign up here</router-link></p>
            </v-flex>

        </v-layout>
    </v-container>
</template>
<script>
import firebase from "firebase";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    login: function() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.$router.replace("home");
          },
          err => {
            alert("Oops. " + err.message);
          }
        );
    }
  }
};
</script>
