<template>
  
      <input
        type="text"
        
        placeholder="Username"
        v-model="username"
      />

<br>
      <input
        type="text"
        
        placeholder="Password"
        v-model="password"
      />
<br>
      <button class="button-81" v-on:click="registerUser()" role="button">
         Create User
        </button>
      
</template>

<script>
import axios from "axios";

export default {
  name: "Registration",

  data() {
    return {
      username: "",
      password: ""
      
    };
  },

  methods: {
     registerUser() {
      let result = await axios.post("http://localhost:8090/posts/create", {
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