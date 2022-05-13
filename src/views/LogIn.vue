<template>
  
           <input
        type="text"
        class="input-username"
        placeholder="Username"
        v-model="username"
      />

<br>
      <input
        type="text"
        class="input-title"
        placeholder="Password"
        v-model="password"
      />
<br>
      <button class="button-81" v-on:click="createPost()" role="button">
          Login
        </button>
      
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",

  data() {
    return {
      username: "",
      password: ""
      
    };
  },

  methods: {
     createPost() {
      let result = await axios.post("http://localhost:8090/register", {
        username: this.username,
        password: this.password
       
      });

      console.log(result);
    },
  },
};
</script>

<style scoped >

</style>