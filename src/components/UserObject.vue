<template>
<<<<<<< HEAD

  <button @click="getAllUsers()" class="getUserButton">getAllUsers</button>
  <div class="layoutUser" v-for="user in usernames" :key="user.username">
    <h1 class="userUsername">{{ user.username }}</h1>
  </div>

=======
<div class="buttongetallUsers">
<button @click="getAllUsers()" class="getUserButton">
get Users

</button>
</div>
<div class="layoutUser" v-for="user in usernames" :key="user.username">

<h1 class="userUsername">{{ user.username }}</h1>




</div>
>>>>>>> fb7822e1fe32ee1c4833f42462c5b5fc190b5177
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
.getUserButton{
  width: 10%;
  height: 40px;
  margin-top: 1em;
  margin-bottom: 2em;
  margin-left: 80em;
  border: 0;
  padding: 10;
  border-radius: 20px;
  color: white;
  background-color: green;
}
.layoutUser {
  margin-top: 0em;
  margin-bottom: 0em;
  margin-left: 35em;
}
<<<<<<< HEAD
.userUsername{
  margin-left:11em;
=======
.userUsername {
  margin-left: 17em;
>>>>>>> fb7822e1fe32ee1c4833f42462c5b5fc190b5177
  width: 25%;
  border: 1px solid black;
  border: 0;
  padding: 20;
  border-radius: 20px;
  color:white;
  background-color:green;
}
<<<<<<< HEAD
.layoutUser {
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 50em;
}
=======


>>>>>>> fb7822e1fe32ee1c4833f42462c5b5fc190b5177
</style>
