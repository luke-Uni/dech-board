<template>
  <div class="top"></div>
  <div class="container">
    <form class="form">
      <img src="../assets/1.png" alt="HeNan" id="logo" />
      <label for="Email"></label>
      <input
        type="text"
        id="email"
        placeholder="E-Mail"
        v-model="email"
        required
      />
      <br />
      <label for="token"></label>
      <input
        type="text"
        id="token"
        placeholder="Token"
        v-model="token"
        required
      />
      <br />
      <button @click="confirmUser()" id="loginButton">Log In</button>
      <p id="feedback"></p>
      <div class="bottom"></div>
      <button @click="goToRegister()" id="registerButton">
        Create new account
      </button>
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
  data() {
    return {
      email: "",
      token: "",
    };
  },

  methods: {
    confirmUser() {
      let result = axios
        .post("http://localhost:8090/confirmuser", {
          email: this.email,
          token: this.token,
        })
        .then((result) => {
          console.log(result);
        });
      console.log(result);
      this.$router.push("/login");
    },
    changeUser(name) {
      this.currentUser = name;
    },
    goToRegister(event) {
      event.preventDefault();
      this.$router.push("registeruser");
    },
  },
};
</script>

<style scoped>
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
  width: 10%;
  float: right;
  background-color: white;
}

#leftImg {
  width: 10%;
  float: left;
  background-color: white;
}

#leftImg img {
  width: 100%;
}

#rightImg img {
  width: 80%;
  float: right;
}

.top,
.footer {
  background-color: rgba(146, 196, 224, 255);
  box-sizing: border-box;
  width: 100%;
  height: 80px;
}
.top {
  top: 0;
}

.container {
  border: 1px solid black;
  width: 20em;
  border-radius: 35px;
  margin: 3% auto;
}

.form {
  display: block;
  margin: 10% auto;
  width: 2oem;
}

#email {
  border-radius: 20px;
  margin-bottom: 10%;
  left: 12%;
  width: 64%;
  height: 40px;
  padding-left: 5%;
  padding-right: 5%;
  box-shadow: 0px 0px 5px grey;
  border: 0 grey solid;
}

#token {
  border-radius: 20px;
  margin-bottom: 40px;
  left: 12%;
  width: 64%;
  height: 40px;
  padding-left: 5%;
  padding-right: 5%;
  box-shadow: 0px 0px 5px grey;
  border: 0 grey solid;
}

#loginButton {
  border-radius: 20px;
  margin-bottom: 10%;
  width: 19em;
  height: 40px;
  background-color: rgba(146, 196, 224, 255);
  border: 0ch white solid;
  box-shadow: 0px 0px 5px rgba(146, 196, 224, 255);
  color: white;
}

#registerButton {
  border-radius: 20px;
  width: 15em;
  height: 40px;
  background-color: rgba(30, 203, 58, 255);
  color: white;
  border: 0ch white solid;
  box-shadow: 0px 0px 5px rgba(30, 203, 58, 255);
}

input {
  margin: 0 auto;
}

.bottom {
  width: 80%;
  height: 2px;
  margin-left: 10%;
  margin-top: 10%;
  border-top: 2px solid black;
  margin-bottom: 10%;
}
</style>
