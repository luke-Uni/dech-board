<template>
  <div>
    <div class="posts" v-for="post in posts" :key="post.username">
      <h2 class="title">{{ post.title }}</h2>
      <h4>{{ post.username }}</h4>
      <p>{{ post.text }}</p>
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
      let headers = {};

      let uri = "";

      let res = axios.get(uri, { headers: headers });

      console.log(res);

      let allPosts = [
        {
          title: "Online class",
          username: "John",
          text: "Online class is so boring. I want to have class at the university and want to see my fellow student.     Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          upVotes: 12,
          downVotes: 4,
        },
        {
          title: "The Weather",
          username: "Lao",
          text: "I am currently in germany in summer. I love the weather it is very nice here.     Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
          upVotes: 9,
          downVotes: 0,
        },
      ];

      this.posts[0] = allPosts[0];
      this.posts[1] = allPosts[1];
      // this.username = posts[0].username;
      // this.title = posts[0].title;
      // this.text = posts[0].text;
      // this.upVotes = posts[0].upVotes;
      // this.downVotes = posts[0].downVotes;
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