<template>
  <div class="buttonAndUser">
    <input
      @click="getAllUsers()"
      type="text"
      v-model="search"
      placeholder="Search User"
      class="searchUser"
    />
    <button @click="getAllUsers()" class="getUserButton">All User</button>
    <div class="layoutUser" v-for="user in filteredPosts" :key="user.username">
      <div class="UserArea"><h2 class="userUsername">{{ user.username }}</h2>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
export default {
  name: "UserObjekt",
  data() {
    return {
      search: "",
      users: [],
      //passwort:"123",
      //email:"arvand@fra-uas.de",
    };
  },
  computed: {
    filteredPosts() {
      return this.users.filter((user) =>
        user.username
          .toLocaleLowerCase()
          .includes(this.search.toLocaleLowerCase())
      );
    },
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
        this.users = response.data;
      });
      console.log(response);
    },
  },
};
</script>

<style scoped>

.buttonandUser {
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
.getUserButton {
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
/* .userUsername {
  margin: auto;
  margin-bottom: 0.4em;
  width: 5em;
  border: 1px solid black;
  border: 0;
  padding: 20;
  border-radius: 20px;
  color: white;
  background-color: 6dfaff;
} */
.layoutUser {
  margin: auto;

  align-content: center;
}
</style>
