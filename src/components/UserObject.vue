<template>
<div class="buttongetallUsers">
<button @click="getAllUsers()" class="getUserButton">
get Users

</button>
</div>
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
.userUsername {
  margin-left: 17em;
  width: 25%;
  border: 1px solid black;
  border: 0;
  padding: 20;
  border-radius: 20px;
  color:white;
  background-color:green;
}


</style>
