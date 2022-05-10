<template>
  <div>
    <div class="postComplete" v-for="post in posts" :key="post.username">
      <h4 class="postUsername">{{ post.username }}</h4>
      <div :class="[post.important ? postsInside : importantPost]">
        <h3 class="postTitle">{{ post.title }}</h3>
        <p class="postText">{{ post.content }}</p>
        <p>
          <b> {{ post.creationDate }} </b>
        </p>
        <p v-if="post.important">Yeah</p>
      </div>
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

      //
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
.postComplete {
  margin: auto;
  width: 45%;
  border: 1px solid rgb(255, 255, 255);
}
.postsInside {
  text-align: left;
  margin: 0%;
  margin-top: 3%;
  align-items: flex-start;
  border: 1px solid black;
  width: 100%;
  height: 10em;
  margin-bottom: 2%;
  border-radius: 10px;
}

.postTitle {
  float: left;
  margin: 0%;
}

.postUsername {
  float: left;
  margin-top: 0%;
}

.postText {
  margin: 0%;
  margin-left: 0%;
  margin-top: 5%;
}
</style>