<template>
  <div>
    <div class="postComplete" v-for="post in posts" :key="post.username">
      <h4 class="postUsername">{{ post.username }}</h4>
      <div :class="[post.important ? 'importantPost' : 'postsInside']">
        <h3 :class="[post.important ? 'importantTitle' : 'postTitle']">
          {{ post.title }}
        </h3>
        <div>
          <p class="postText" id="hello">{{ post.content }}</p>
        </div>
        <p>
          <b> {{ post.creationDate }} </b>
          <button @click="translateText(post)">Translate</button>
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
      postcontent: "",
      kallo: "hallo ich bin rachid",
      postTranslated: false,
    };
  },
  beforeMount() {
    this.getAllPosts();
  },
  methods: {
    async translateText(text) {
      let hallo1 = "";

      const axios = require("axios");

      const encodedParams = new URLSearchParams();
      encodedParams.append("q", text.content);
      encodedParams.append("target", "zh-CN");
      encodedParams.append("source", "en");

      const options = {
        method: "POST",
        url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
          "X-RapidAPI-Key":
            // "7d1b34c23cmshf82fb063e5c4987p15f36fjsn2ae75f209a89",
            // "5d1d5e4d29msh38383cbe012e65dp1bc8ecjsnc81fe54408d0",
            // "702f1e51f7msh51a1f9495e6f4e0p10180bjsnba5626672929",
            "21ec3285f4msh32c045448fe36e4p1c3201jsna2215e8d5989",
        },
        data: encodedParams,
      };

      await axios
        .request(options)
        .then(function (response) {
          hallo1 = response.data.data.translations[0].translatedText;
          console.log(hallo1);
          console.log(typeof hallo1);
        })
        .catch(function (error) {
          console.error(error);
        });

      for (let i = 0; i < this.posts.length; i++) {
        console.log(this.posts[i].postId + " " + text.postId);
        if (this.posts[i].postId == text.postId) {
          this.posts[i].content = hallo1;
        }
      }
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