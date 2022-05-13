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
      <button class="button-81" v-on:click="loginUser()" role="button">
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
     loginUser() {
      let result = await axios.get("http://localhost:8090/register", {
        username: this.username,
        password: this.password,
        
       
      }
      
      );
      localStorage.setItem('token', result.data.token);

      console.log(result);
    },
  },
};
</script>

<style scoped >

</style>