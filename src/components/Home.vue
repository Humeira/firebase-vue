<template>
  <div>
    <v-card-text>
      <p class="text-xs-center headline font-weight-bold">Favourite Movies</p>
    </v-card-text>
    <v-btn color="info" @click.prevent="add" ripple>Add Movie</v-btn>
    <v-fab-transition>
      <v-data-table :headers="headers" :items="movies" class="elevation-1" v-if="!add">
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.director }}</td>
          <td class="text-xs-left">{{ props.item.year }}</td>
          <td>Delete</td>
        </template>
      </v-data-table>
    </v-fab-transition>
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
  }
};
</script>
