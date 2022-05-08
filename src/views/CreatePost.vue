<template>

  <input type="text" placeholder="Username" v-model="username" />
  <br />
  <input type="text" placeholder="Title" v-model="title" />
  <br />
  <input type="text" placeholder="content" v-model="content" />
  <br />
  
  <input type="checkbox" name="Important" v-model="important"> <p> Important</p>
  <br />
  <input type="text" placeholder="balance" v-model="balance" />

  <br />

  <button v-on:click="addUser()">Create User</button>
</template>

<script>
import axios from "axios";

export default {
  name: "CreatePost",
  data() {
    return {
      email: "",
      username: "",
      firstname: "",
      lastName: "",
      birthday: "",
      balance: "",
      token: "",
    };
  },
  methods: {
    async addUser() {
      let headers = {
        "Content-Type": "application/json",
        token: this.token,
      };
      let result = await axios.post(
        "http://localhost:8090/",
        {
          email: this.email,
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          birthday: this.birthday,
          balance: this.balance,
        },

        {
          headers: headers,
        }
      );

      console.warn(result);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>