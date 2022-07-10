<template>
  <div class="top"></div>
  <div class="container">
    <form class="form" @submit="checkForm">
      <img src="../assets/1.png" alt="HeNan" id="logo" />
      <label for="username"></label>
      <input
        type="text"
        id="username"
        required
        placeholder=" &nbsp;&nbsp;Username"
        v-model="username"
        maxlength="25"
      />
      <br />
      <label for="password"></label>
      <input
        required
        type="password"
        id="password"
        placeholder=" &nbsp;&nbsp;Password"
        v-model="password"
        maxlength="30"
      />
      <br />
      <label for="username"></label>
      <input
        type="text"
        id="firstName"
        required
        placeholder=" &nbsp;&nbsp;First name"
        v-model="firstName"
      />
      <br />
      <label for="last name"></label>
      <input
        type="text"
        required
        id="lastName"
        placeholder=" &nbsp;&nbsp;Last name"
        v-model="lastName"
      />
      <br />

      <label for="email"></label>
      <input
        type="text"
        required
        id="birthdy"
        placeholder=" &nbsp;&nbsp;E-Mail"
        v-model="email"
        maxlength="40"
      />

      <br />
      <p id="feedback">{{ feedback }}</p>
      <br />

      <button class="primary" @click="registerAcc()" id="loginButton">
        Sign up
      </button>
      <span id="span"
        >Have an account?
        <a href="Login" @click="goToLogin($event)">Log in</a></span
      >
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
      email: "",
      feedback: "",
      errors: [],
    };
  },

  methods: {
    goToLogin() {
      this.$router.push("/login");
    },
    async registerAcc() {
      let headers = { "Content-Type": "application/json" };
      let res = await axios
        .post(
          "http://localhost:8090/register",
          {
            username: this.username,
            password: this.password,
            email: this.email,
          },
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.$router.push("/login");
          console.log(res.status);
        })
        .catch((error) => {
          // error.response can be null
          console.log(error.response.data);
          console.log(error.response.status);
          if (error.response && error.response.status == 417) {
            if (error.response.data == "Username already exists!") {
              this.feedback = "Username already exists!";
            } else if (
              error.response.data == "Email has to be from University!"
            ) {
              this.feedback = "Email has to be from University!";
            } else if (error.response.data == "Email is already in use!") {
              this.feedback = "Email is already in use!";
            }

            console.log(error.res.data.error.data);
          } else if (error.response && error.response.status === 400) {
            this.feedback = "User does not Exist!";
            console.log(error.response.data.error);
          }
        });
      console.log(res.status);
    },

    checkForm: function (e) {
      if (this.username && this.email) return true;
      this.errors = [];
      if (!this.username) this.errors.push("Username required.");
      if (!this.email) this.errors.push("E-Mail required.");
      e.preventDefault();
    },
  },
};
</script>

<style scoped>
input:required:focus {
  border: 1px solid red;
  outline: none;
}

input:required:hover {
  opacity: 1;
}

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
  background-color: blue;
  height: 100%;
  width: 10%;
  float: right;
  background-color: white;
}
#leftImg {
  height: 100%;
  width: 10%;
  float: left;
  background-color: white;
}
#leftImg img {
  width: 100%;
}
#rightImg img {
  width: 100%;
  float: right;
}
.top,
.footer {
  bottom: 0%;
  background-color: #92c4e0;
  box-sizing: border-box;
  position: absolute;
  width: 90%;
  height: 5em;
  left: 10em;
}

.container {
  position: absolute;
  left: 45%;
  top: 5em;
  border: 1px solid black;
  width: 18em;
  height: 40px;

  box-shadow: 0px 0px 5px grey;
  border: 0 grey solid;
}
#password {
  border-radius: 20px;
  margin-bottom: 10%;
  box-shadow: 0px 0px 5px grey;
  border: 0 grey solid;
}
#loginButton {
  border-radius: 20px;
  margin-bottom: 10%;
  width: 19em;
  height: 40px;
  background-color: rgba(30, 203, 58, 255);
  border: 0ch white solid;
  box-shadow: 0px 0px 5px rgba(30, 203, 58, 255);
  color: white;
}
#loginButton:hover {
  cursor: pointer;
}
#fotgotten {
  display: block;
  margin-left: 30%;
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
}

#feedback {
  color: red;
}
</style>