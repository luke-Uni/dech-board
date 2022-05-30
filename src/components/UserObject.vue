<template>
  <button @click="getAllUsers()">getAllUsers</button>
  <div class="layoutUser" v-for="user in usernames" :key="user.username">
    <h1 class="userUsername">{{ user.username }}</h1>
  </div>
</template>




<script>
import axios from "axios";
export default {
  name: "UserObjekt",
  data() {
    return {
      usernames: [],
      //passwort:"123",
      //email:"arvand@fra-uas.de",
    };
  },

  methods: {
    getAllUsers() {
      //console.logs("workung (UserList funct.)");
      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };

      let uri = "http://localhost:8090/getUsers";

      let response = axios.get(uri, { headers: headers }).then((response) => {
        this.usernames = response.data;
      });
      console.log(response);
    },
  },
};
</script>

<style scoped>
.layoutUser {
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 50em;
}
</style>