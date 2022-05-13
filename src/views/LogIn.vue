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
      password: "",
      tokens:[]
      
    };
    
  },

  methods: {
      loginUser() {
      let result =  axios.post("http://localhost:8090/login", {
        username: this.username,
        password: this.password,
        
       
      }
      
      ).then((result) => {
          console.log(result);

          this.tokens[0] = result.data;
          localStorage.setItem('token', this.tokens[0].token);
        });
      
//     console.log(result.data);
//     console.log(result.constructor);
//    // console.log(result.Object.data);
//     console.log(result.constructor.data);
    console.log(result)
   
      
    },
  },
};
</script>

<style scoped >

</style>