<template>
  <div>
    <v-card-text>
      <p class="text-xs-center headline font-weight-bold">Favourite Movies</p>
    </v-card-text>
    <v-btn color="info" @click.prevent="showAddForm" ripple>
      <span v-if="!add">Add Movie</span>
      <span v-else>Cancel</span>
    </v-btn>
    <v-data-table :headers="headers" :items="movies" class="elevation-1" v-if="!add">
      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.movie_id }}</td>
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.director }}</td>
        <td class="text-xs-left">{{ props.item.year }}</td>
        <td>
          <v-btn color="error" @click="deleteMovie(props.item.movie_id, props.item.id)">Delete</v-btn>
        </td>
      </template>
    </v-data-table>
    <v-container v-else>
      <v-layout row align-center justify-center fill-height>
        <v-flex xs6>
          <v-card-text>
            <p class="text-xs-center headline font-weight-bold">Add a movie to your list</p>
          </v-card-text>
          <v-text-field v-model="name" label="Name" required></v-text-field>
          <v-text-field v-model="director" label="Director"></v-text-field>
          <v-text-field v-model="year" label="Year"></v-text-field>
          <v-btn color="info" @click.prevent="save" large ripple text-center>Add</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import { database } from "../firebaseConfig.js";
export default {
  name: "Home",
  data() {
    return {
      headers: [
        {
          text: "#",
          value: "movie_id"
        },
        {
          text: "Movie",
          value: "movie"
        },
        {
          text: "Director",
          value: "director"
        },
        {
          text: "Year",
          value: "year"
        },
        {
          text: "",
          value: ""
        }
      ],
      movies: [],
      add: false,
      name: null,
      director: null,
      year: null
    };
  },

  created() {
    database
      .collection("movies")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let data = {
            id: doc.id,
            movie_id: doc.data().movie_id,
            name: doc.data().name,
            director: doc.data().director,
            year: doc.data().year
          };
          this.movies.push(data);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    this.$on("showList", () => {
      this.add = false;
    });
  },

  methods: {
    showAddForm: function() {
      this.add = !this.add;
    },

    deleteMovie: function(movie_id, id) {
      database
        .collection("movies")
        .where("movie_id", "==", movie_id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.delete();
            this.movies.splice(id, 1);
            this.$router.replace("/");
          });
        });
    },
    save: function() {
      database
        .collection("movies")
        .add({
          movie_id: Math.floor(1000 + Math.random() * 900),
          name: this.name,
          director: this.director,
          year: this.year
        })
        .then(docRef => {
          this.movies.push({
            movie_id: Math.floor(1000 + Math.random() * 900),
            name: this.name,
            director: this.director,
            year: this.year
          });
          this.add = false;
          (this.name = null), (this.director = null), (this.year = null);
          this.$router.replace("home");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
