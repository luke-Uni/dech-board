<template>
  <div>
    <div class="posts" v-for="post in posts" :key="post.username">
      <h2 class="title">{{ post.title }}</h2>
      <h4>{{ post.username }}</h4>
      <p>{{ post.content }}</p>
      <p>
        <b> {{ post.creationDate }} </b>
      </p>
      <p v-if="post.important">Yeah</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      posts: [],
    };
  },
  beforeMount() {
    this.getAllPosts();
  },
  methods: {
    //To display all the Posts we need to get them from the Server
    getAllPosts() {
      console.log("I am in the getAllPosts function");

      let headers = { "Content-Type": "application/json" };

      let uri = "http://localhost:8090/posts/getall";

      let response = axios
        .get(uri, { headers: headers })
        .then((response) => {
          console.log(response);

          this.posts = response.data;
        })
        .then((data) => (this.user = data))
        .catch((e) => {
          this.errors.push(e);
        });

      console.log(response.constructor);
    },
  },
};
</script>

<style scoped>
.posts {
  margin: auto;
  border: 3px solid black;
  width: 45%;
  height: 30em;
  margin-bottom: 2%;
}
</style>