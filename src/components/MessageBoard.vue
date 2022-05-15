<template>
  <div>
    <div class="postComplete" v-for="post in posts" :key="post.username">
      <h4 class="postUsername">{{ post.username }}</h4>
      <div :class="[post.important ? 'importantPost' : 'postsInside']">
        <h3 :class="[post.important ? 'importantTitle' : 'postTitle']">
          {{ post.title }}
        </h3>
        <p class="postText">{{ post.content }}</p>
        <p>
          <b> {{ post.creationDate }} </b>
        </p>
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

      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };

      let uri = "http://localhost:8090/posts/getall";

      //send synchron Request to Server
      let response = axios
        .get(uri, { headers: headers })
        .then((response) => {
          console.log(response);

          this.posts = response.data;
        })
        //save all Posts locally
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
  width: 50em;
  border: 1px solid rgb(255, 255, 255);
  text-align: left;
}
.postsInside {
  background-color: rgb(244, 247, 255, 255);
  text-align: left;
  margin: 0%;
  align-items: flex-start;
  border: 1px solid black;
  width: 100%;
  height: 10em;
  margin-bottom: 2%;
  border-radius: 10px;
}
.importantPost {
  background-color: rgb(244, 247, 255, 255);
  text-align: left;
  margin: 0%;
  align-items: flex-start;
  border: 1px solid rgb(220, 46, 46);
  width: 100%;
  height: 10em;
  margin-bottom: 2%;
  border-radius: 10px;
}

.postTitle {
  float: left;
  margin: 0%;
  margin-left: 1em;
  margin-top: 0.5em;
}

.importantTitle {
  float: left;
  margin: 0%;
  margin-left: 1em;
  margin-top: 0.5em;
  color: red;
}
.postUsername {
  margin-top: 1em;
  margin-bottom: 1em;
}
.postText {
  margin: 0%;
  margin-left: 3em;
  margin-top: 5%;
  margin-right: 3em;
}
</style>