<template>
<div class="top"></div>
  <div class="container">
    <form class="form">
      <img src="../assets/social-media.png" alt="HeNan" class="logo" />
      <label for="username"></label>
      <input
        type="text"
        id="username"
        placeholder="Username"
        v-model="username"
        maxlength="25"
        required
      />
      <br />
      <label for="password"></label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        v-model="password"
        maxlength="30"
        required
      />
      <br />
      <button @click="loginUser()" id="loginButton">Log In</button>
      <p id="feedback">{{ feedback }}</p>
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
      username: "",
      password: "",
      currentUser: "",
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
          console.log(result.status);
          this.tokens[0] = result.data;

          //Bug
          localStorage.setItem("token", this.tokens[0].token);
          localStorage.setItem("currentuser", this.username);
          // localStorage.setItem("username", this.username);

          this.$router.push("/");
        })
        .catch((error) => {
          // error.response can be null
          if (error.response && error.response.status === 417) {
            this.feedback = "Wrong Password!";
            console.log(error.response.data.error);
          } else if (error.response && error.response.status === 400) {
            this.feedback = "User does not Exist!";
            console.log(error.response.data.error);
          }
        });

      //     console.log(result.data);
      //     console.log(result.constructor);
      //    // console.log(result.Object.data);
      //     console.log(result.constructor.data);
      console.log(result.status);
    },

    checkPassword(password) {
      return this.users.filter((user) => password === user.password);
    },

    checkCredentials() {
      //event.preventDefault();

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
.logo {
  position: relative;
  top: -1.3em;
  width: 10em;
  height: 7.5em;
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
.footer {
  bottom: 0%;
  left: 0%;
  background-color: rgba(146, 196, 224, 255);
  box-sizing: border-box;
  position: absolute;
  width: 100%;
}
.top {
  box-sizing: border-box;
  position: absolute;
  top: 0%;
  left:0%;
  width: 100em;
  height: 4em;
background-color: rgba(146, 196, 224, 255);
}

.container {
  border: 1px solid black;
  position: absolute;
  top: 7em;
  left:40%;
  width: 20%;
  border-radius: 35px;


}

.form {
  display: block;
  margin: 10% auto;
  width: 20em;
}

#username {
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

#password {
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
#loginButton:hover {
  cursor: pointer;
}

#registerButton {
  border-radius: 20px;
  /* margin-bottom: 40px; */
  width: 15em;
  height: 40px;
  background-color: rgba(30, 203, 58, 255);
  color: white;
  border: 0ch white solid;
  box-shadow: 0px 0px 5px rgba(30, 203, 58, 255);
}

#registerButton:hover {
  cursor: pointer;
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

#feedback {
  color: red;
}
</style>