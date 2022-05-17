<template>
  <div class="top">
  </div>
  <div class="container">
    <form class="form">
      <fieldset>
        <img src="../assets/1.png" alt="HeNan" id="logo">
        <label for="username"></label>
        <input type="text" id="username" placeholder=" &nbsp;&nbsp;Username" v-model="username" />
        <br />
        <label for="password"></label>
        <input type="password" id="password" placeholder=" &nbsp;&nbsp;Password" v-model="password" />
        <br />
        <button class="primary" @click="loginUser()" id="loginButton">Log In</button>
        <a href="#" id="fotgotten">Forgotten password</a>
        <div class="bottom"></div>
        <button class="primary" @click="goToRegister($event)" id="registerButton">Create new account</button>
      </fieldset>
    </form>
  </div>
  <div class="footer">
    <div id="leftImg">
      <img src="../assets/河南师范大学.png" alt="">
    </div>
    <div id="rightImg">
      <img src="../assets/logo.svg" alt="">
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
         // localStorage.setItem("username", this.username);
        });

      //     console.log(result.data);
      //     console.log(result.constructor);
      //    // console.log(result.Object.data);
      //     console.log(result.constructor.data);
      console.log(result);
      this.$router.push("/");
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
      this.$router.push("registeruser");
    },
  },
};
</script>

<style scoped>
*{
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

.top,.footer{
  /* top: 0; */
  background-color: rgba(146, 196, 224, 255);
  box-sizing: border-box;
  /* position: absolute; */
  width: 100%;
  height: 80px;
}
.top{
  /* position: absolute; */
  top: 0;
}
.footer {

}

.container {
  
  border: 1px solid black;
  width: 23%;
  border-radius: 60px;
  margin: 2% auto;
}

.form {
  display: block;
  margin: 10% auto;
}

#username {
  border-radius: 20px;
  margin-bottom: 10%;
  width: 80%;
  height: 40px;
  margin-left: 10%;
  box-shadow: 0px 0px 5px grey;
  border: 0 grey solid;
}

#password {
  border-radius: 20px;
  margin-bottom: 40px;
  width: 80%;
  height: 40px;
  margin-left: 10%;
  box-shadow: 0px 0px 5px grey;
  border: 0 grey solid;
}

#loginButton {
  border-radius: 20px;
  margin-bottom: 10%;
  width: 80%;
  height: 40px;
  background-color: rgba(146, 196, 224, 255);
  border: 0ch white solid;
  margin-left: 10%;
  box-shadow: 0px 0px 5px rgba(146, 196, 224, 255);
  color: white;
}

#registerButton {
  border-radius: 20px;
  /* margin-bottom: 40px; */
  width: 60%;
  height: 40px;
  background-color: rgba(30, 203, 58, 255);
  margin-left: 20%;
  color: white;
  font-size: 60%;
  border: 0ch white solid;
  box-shadow: 0px 0px 5px rgba(30, 203, 58, 255);
}

#fotgotten {
  display: block;
  margin-left: 30%;
  /* margin-bottom: 20px; */
  width: 40%;
  font-size: 30%;
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
</style>
