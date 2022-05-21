<template>
  <div class="top"></div>
  <div class="container">
    <form class="form">
      <!-- <fieldset> -->
      <img src="../assets/1.png" alt="HeNan" id="logo" />
      <label for="username"></label>
      <input
        type="text"
        id="username"
        placeholder=" &nbsp;&nbsp;Username"
        v-model="username"
        
      />
      <br />
      <label for="password"></label>
      <input
        type="password"
        id="password"
        placeholder=" &nbsp;&nbsp;Password"
        v-model="password"
        
      />
      <br />
      <label for="username"></label>
      <input
        type="text"
        id="firstName"
        placeholder=" &nbsp;&nbsp;First name"
        v-model="firstName"
      />
      <br />
      <label for="last name"></label>
      <input
        type="text"
        id="lastName"
        placeholder=" &nbsp;&nbsp;Last name"
        v-model="lastName"
      />
      <br />
      <label for="email"></label>
      <input
        type="text"
        id="birthdy"
        placeholder=" &nbsp;&nbsp;E-Mail"
        v-model="email"
       
      />

      <br />
      <!-- <div id="radio">
          <input type="radio" />i've read and accepted the
          <a href="">Privacy Policy</a> -->
      <!-- </div> -->
      <br />
      <button class="primary" @click="registerAcc()" id="loginButton">
        Sign up
      </button>
      <span id="span"
        >Have an account?
        <a href="Login" @click="goToLogin($event)">Log in</a></span
      >
      <!-- </fieldset> -->
    </form>
  </div>
  <div class="footer">
    <div id="leftImg">
      <img src="../assets/河南师范大学.png" alt="" />
    </div>
    <div id="rightImg">
      <img src="../assets/logo.svg" alt="" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistrationForm",

  data() {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      birthdy: "",
    };
  },

  methods: {
    goToLogin() {
      // event.preventDefault();
      this.$router.push("/login");
    },
    async registerAcc() {
<<<<<<< HEAD
=======
      
>>>>>>> b13826616d52d6da1ccb64d2d4f69c8c5feba55e
      let headers = { "Content-Type": "application/json" };
      let res = await axios.post(
        "http://localhost:8090/register",
        // "https://dech-board-rest-server.herokuapp.com/register",
        { username: this.username, password: this.password },
        {
          headers: headers,
        }
      );
      console.log(res.status);
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
input {
  text-align: center;
}

* {
  margin: 0;
  padding: 0;
}
#logo {
  margin-bottom: 10%;
  width: 80%;
  margin-left: 10%;
}
#rightImg {
  /* background-color: blue; */
  /* height: 80%; */
  width: 10%;
  float: right;
  background-color: white;
}
#leftImg {
  /* background-color: black; */
  /* height: 80%; */
  width: 10%;
  float: left;
  background-color: white;
}
#leftImg img {
  width: 100%;
  /* opacity: 0.7; */
}
#rightImg img {
  width: 80%;
  float: right;
}
.top,
.footer {
  /* top: 0; */
  background-color: rgba(146, 196, 224, 255);
  box-sizing: border-box;
  /* position: absolute; */
  width: 100%;
  height: 80px;
}

.container {
  border: 1px solid black;
  /* width: 23%; */
  margin: 3% auto;
  border-radius: 35px;
  width: 20em;
}

.form {
  display: block;
  margin: 10% auto;
}

#username,
#firstName,
#lastName,
#birthdy {
  border-radius: 20px;
  margin-bottom: 10%;
  /* width: 80%; */
  width: 18em;
  height: 40px;

  box-shadow: 0px 0px 5px grey;
  border: 0 grey solid;
}
#password {
  border-radius: 20px;
  margin-bottom: 10%;
  /* width: 80%; */
  height: 40px;
  width: 18em;
  /* margin-left: 10%; */
  box-shadow: 0px 0px 5px grey;
  border: 0 grey solid;
}
#loginButton {
  border-radius: 20px;
  margin-bottom: 10%;
  /* width: 80%; */
  width: 19em;
  height: 40px;
  background-color: rgba(30, 203, 58, 255);
  border: 0ch white solid;
  /* margin-left: 10%; */
  box-shadow: 0px 0px 5px rgba(30, 203, 58, 255);
  color: white;
}
#fotgotten {
  display: block;
  margin-left: 30%;
  /* margin-bottom: 20px; */
  width: 40%;
  font-size: 30%;
  text-align: center;
}
#span {
  font-size: 85%;
  display: block;
  width: 60%;
  margin-left: 20%;
  text-align: center;
}
input {
  margin: 0 auto;
}
.bottom {
  /* background-color: black; */
  width: 80%;
  height: 2px;
  margin-left: 10%;
  margin-top: 10%;
  border-top: 2px solid black;
  margin-bottom: 10%;
}
#radio {
  font-size: 40%;
  widows: 80%;
  margin-left: 10%;
  /* text-align: center; */
}
</style>