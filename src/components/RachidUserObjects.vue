<template>
  <div id="app">
    <input type="text" v-model="search">
    <button @click="getAllUsers()" class="getUserButton">All User</button>
    <div v-for="user in filteredPosts" :key="user.id">
      <RachidUser :user="user"></RachidUser>
      
    </div>
  </div>
</template>

<script>
import RachidUser from "./RachidUser.vue";
import axios from "axios";

export default {
  name: "RachidUserObjects",
  components: {
    RachidUser
  },
  data() {
    return {
      search: "",
      users: []
    };
  },
  computed: {
    filteredPosts() {
      return this.users.filter(user =>
        user.username.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods:  {
    getAllUsers() {
      //console.logs("workung (UserList funct.)");
      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };

      let uri = "http://localhost:8090/getUsers";

      let response = axios.get(uri, { headers: headers }).then((response) => {
        this.users = response.data;
      });
      console.log(response);
    },
    
  },
};
</script>

<style>




.buttonandUser{
width: 50em;
  height: 40px;
  margin-top: 1em;
  margin-bottom: 2em;
  
  border: 0;
  padding: 10;
  border-radius: 20px;
  color: white;
  background-color: #6dfaff;
}
.getUserButton{
  width: 10%;
  height: 40px;
  margin-top: 1em;
  margin-bottom: 2em;
  border: 0;
  padding: 10;
  border-radius: 20px;
  color: white;
  background-color: #6dfaff;
}
.layoutUser {
  margin-top: 0em;
  margin-bottom: 0em;
  
}
.userUsername{
  margin:auto;
  margin-bottom:0.4em;
  width: 5em;
  border: 1px solid black;
  border: 0;
  padding: 20;
  border-radius: 20px;
  color:white;
  background-color:#6dfaff;
}
.layoutUser {
  margin: auto;
  
  align-content: center;
}


</style>
