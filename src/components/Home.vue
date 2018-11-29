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
          <v-btn color="error" @click="deleteMovie(props.item.movie_id)">Delete</v-btn>
        </td>
      </template>
    </v-data-table>
    <add v-else></add>
  </div>
</template>
<script>
import { database } from "../firebaseConfig.js";
import Add from "./Add.vue";
export default {
  name: "Home",
  components: {
    Add
  },
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
      add: false
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
  },

  methods: {
    showAddForm: function() {
      this.add = !this.add;
    },

    deleteMovie: function(id) {
        console.log(id);
      database
        .collection("movies")
        .where("movie_id", "==", id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.delete();
          });
        });
    }
  }
};
</script>
