<template>
  <div>
    <div class="postComplete" v-for="post in posts" :key="post.username">
      <h4 class="postUsername">{{ post.username }}</h4>
      <div :class="[post.important ? 'importantPost' : 'postsInside']">
        <h3 :class="[post.important ? 'importantTitle' : 'postTitle']">
          {{ post.title }}
        </h3>
        <p class="postText">{{ translateText(post.content) }}</p>
        <p>
          <b> {{ post.creationDate }} </b>
          <!-- <button @click="translateText(post.content)"></button> -->
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
      //postcontent: ""
    };
  },
  beforeMount() {
    this.getAllPosts();
  },
  methods: {
    async translateText(text) {
      const axios = require("axios");

      const encodedParams = new URLSearchParams();
      encodedParams.append("q", text);
      encodedParams.append("target", "de");
      encodedParams.append("source", "en");

      const options = {
        method: "POST",
        url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
          "X-RapidAPI-Key":
            // "7d1b34c23cmshf82fb063e5c4987p15f36fjsn2ae75f209a89",
            "5d1d5e4d29msh38383cbe012e65dp1bc8ecjsnc81fe54408d0",
        },
        data: encodedParams,
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          console.log(response.data.translations);
          
          
          return response.data;
         
        })
        .catch(function (error) {
          console.error(error);
        });
        
        
    },
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
  border: 1px;
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
  box-shadow: 5px 10px 8px #888888;
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
  box-shadow: 5px 10px 18px red;
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