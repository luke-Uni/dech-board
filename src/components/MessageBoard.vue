<template>
  <div>
    <div class="posts" v-for="post in posts" :key="post.username">
      <h2 class="title">{{ post.title }}</h2>
      <h4>{{ post.username }}</h4>
      <p>{{ post.text }}</p>
      <p>
        <b> {{ post.creationDate }} </b>
      </p>
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

      //let headers = {};

      let uri = "http://localhost:8090/posts/getall";

      let response = axios.get(uri);

      console.log(response.status);

      //dummie posts to test
      let allPosts = [
        {
          title: "Online class",
          username: "John",
          text: "Online class is so boring. I want to have class at the university and want to see my fellow student.     Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          upVotes: 12,
          downVotes: 4,
          creationDate: "2022-05-06T20:14:22.511Z",
        },
        {
          title: "The Weather",
          username: "Lao",
          text: "I am currently in germany in summer. I love the weather it is very nice here.     Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          upVotes: 9,
          downVotes: 0,
        },
      ];

      //Input all data into local array of posts from the server
      for (let index = 0; index < allPosts.length; index++) {
        this.posts[index] = allPosts[index];
      }
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