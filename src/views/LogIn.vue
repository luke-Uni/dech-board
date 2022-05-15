
<template>
  <!-- <input
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
<br> -->

  <div class="top"></div>
  <div class="container">
    <form class="form">
      <fieldset>
        <!-- <img src="../assets/1.png" alt="HeNan" id="logo" /> -->
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
        <button class="primary" @click="loginUser()" id="loginButton">
          Login
        </button>
        <a href="#" id="fotgotten">Forgotten password</a>
        <div class="bottom"></div>
        <button
          class="primary"
          @click="goToRegister($event)"
          id="registerButton"
        >
          Register
        </button>
      </fieldset>
    </form>
  </div>
  <div class="footer">
    <div id="leftImg">
      <!-- <img src="../assets/河南师范大学.png" alt="" /> -->
    </div>
    <div id="rightImg">
      <!-- <img src="../assets/logo.svg" alt="" /> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LogIn",

  data() {
    return {
      username: "",
      password: "",
      currentUser: "flo",
      feedback: "",
      tokens: [],
    };
  },

  methods: {
    loginUser() {
      let result = axios
        .post("http://localhost:8090/login", {
          username: this.username,
          password: this.password,
        })
        .then((result) => {
          console.log(result);

          this.tokens[0] = result.data;
          localStorage.setItem("token", this.tokens[0].token);
          localStorage.setItem("username", this.username);
        });

      //     console.log(result.data);
      //     console.log(result.constructor);
      //    // console.log(result.Object.data);
      //     console.log(result.constructor.data);
      console.log(result);
    },
    checkPassword(password) {
      return this.users.filter((user) => password === user.password);
    },
    checkCredentials(event) {
      event.preventDefault();
      if (
        this.username === this.currentUser &&
        this.checkPassword(this.password).length !== 0
      ) {
        this.feedback = "Korrekte Credentaials";
      } else {
        this.feedback = "Falsche Credentials";
      }
    },
    changeUser(name) {
      this.currentUser = name;
    },
    goToRegister(event) {
      event.preventDefault();
      this.$router.push("register");
    },
  },
};
</script>

<style scoped>
#logo {
  margin-bottom: 30px;
}
#leftImg {
  /* background-color: black; */
  height: 40px;
  width: 20%;
  float: left;
}
#leftImg img {
  width: 65%;
  opacity: 0.7;
}
#rightImg img {
  width: 65%;
}
#rightImg {
  /* background-color: blue; */
  height: 40px;
  width: 20%;
  float: right;
}
.top,
.footer {
  height: 60px;
  background-color: aqua;
}
.container {
  border: 1px solid black;
  width: 400px;
  height: 500px;
  /* background-color: aqua; */
  border-radius: 60px;
  margin: 3% auto;
}
.form {
  /* padding: 40px 35px; */
  display: block;
  margin: 40px auto;
}
#username {
  border-radius: 20px;
  margin-bottom: 40px;
  width: 300px;
  height: 40px;
  margin-left: 35px;
  box-shadow: 3px 3px 3px grey;
}
#password {
  border-radius: 20px;
  margin-bottom: 40px;
  width: 300px;
  height: 40px;
  margin-left: 35px;
  box-shadow: 3px 3px 3px grey;
}
#loginButton {
  border-radius: 20px;
  margin-bottom: 20px;
  width: 300px;
  height: 40px;
  background-color: cadetblue;
  margin-left: 35px;
}
#registerButton {
  border-radius: 20px;
  margin-bottom: 40px;
  width: 200px;
  height: 40px;
  background-color: rgb(63, 218, 63);
  margin-left: 75px;
}
#fotgotten {
  margin-left: 90px;
  margin-bottom: 20px;
}
input {
  margin: 0 auto;
}
img {
  width: 300px;
  height: 50px;
  margin-bottom: 5px;
  margin-left: 35px;
}
.bottom {
  /* background-color: black; */
  width: 300px;
  height: 2px;
  margin-left: 35px;
  margin-top: 20px;
  border-top: 2px solid black;
  margin-bottom: 20px;
}
</style>