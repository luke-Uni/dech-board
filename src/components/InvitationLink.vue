<template>
  <div>
    <p>{{ link }}</p>
    <button @click="showLink()">Invitation Link</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    link: "http://localhost:8080/#/registeruser";
  },

  methods: {
    showLink() {
      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };

      let uri = "http://localhost:8090/posts/getall";
      //send synchron Request to Server
      let response = axios.get(uri, { headers: headers });

      console.log(response.status);
    },
  },
};
</script>

<style scoped>
</style>