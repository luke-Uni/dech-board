<template>
  <!-- <div class="searchUser">

</div> -->

  <nav class="menu-container">
    <div class="logo-div">
      <img
        src="../assets/1.png"
        alt="HeNan"
        class="logo"
        @click="this.$router.push('/')"
      />
    </div>
    <div class="navbar">
      <a class="navbar-a" @click="this.$router.push('/')"
        >Home
        <img class="home-icon" src="../assets/home-icon.png" alt="home-icon" />
      </a>
      <a class="navbar-a" @click="this.$router.push('/registeruser')"
        >Register
        <img
          class="register-icon"
          src="../assets/register-icon.png"
          alt="register-icon"
        />
      </a>
      <a class="navbar-a" @click="this.$router.push('/login')"
        >Login
        <img
          class="login-icon"
          src="../assets/login-icon.png"
          alt="login-icon"
        />
      </a>
      <a class="navbar-a" @click="this.$router.push('/test')"
        >Test
        <img class="test-icon" src="../assets/test-icon.png" alt="test-icon" />
      </a>
      <a class="navbar-a" @click="this.$router.push('/userlistview')"
        >Userlist
        <img
          class="userlist-icon"
          src="../assets/users-alt.png"
          alt="userlist-icon"
        />
      </a>
      <a class="navbar-a" @click="this.$router.push('/conversationview')"
        >Conversation
        <img
          class="conversation-icon"
          src="../assets/conversation-icon.png"
          alt="c-icon"
        />
      </a>
    </div>
  </nav>
</template>
<script>
export default {
  name: "NavBar",
};
</script>

<style scoped>
a {
  color: #506698;
  text-decoration: none;
}

.picture {
  position: absolute;
  width: 232px;
  height: 73px;
  left: 0px;
  top: 35px;

  mix-blend-mode: multiply;
}

/* .searchUser{
    position: absolute;
    width: 340px;
    height: 48px;
    left: 844px;
    top: 46px;
    left: 0%;
    right: 0%;
    top: 0%;
    bottom: 0%;

    margin-top: 2em;
    margin-left: 80em; 

    background: #F4F7FF;
    border-radius: 10px;
} */

* {
  font-family: "Basier circle", -apple-system, system-ui, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-weight: 600;
}

/* Top Navbar for testing */
.margin_class {
  background-color: black;
}

/* Left Side Bar CSS */
.navbar-a {
  --c: #00000000;
  /* the color */
  --b: 0.5em;
  /* border length*/
  --d: 15px;
  /* the cube depth */

  --_s: calc(var(--d) + var(--b));

  color: #000000bb;
  border: solid rgba(248, 248, 248, 0);
  border-width: var(--b) var(--b) var(--_s) var(--_s);
  background: conic-gradient(
        at left var(--d) bottom var(--d),
        #0000 90deg,
        rgba(255, 255, 255, 0.205) 0 225deg,
        rgba(255, 255, 255, 0.404) 0
      )
      border-box,
    conic-gradient(at left var(--_s) bottom var(--_s), #0000 90deg, var(--c) 0)
      0 100% / calc(100% - var(--b)) calc(100% - var(--b)) border-box;
  transform: translate(calc(var(--d) / -1), var(--d));
  clip-path: polygon(
    var(--d) 0%,
    var(--d) 0%,
    100% 0%,
    100% calc(100% - var(--d)),
    100% calc(100% - var(--d)),
    var(--d) calc(100% - var(--d))
  );
  transition: 0.2s;

  /* Side Bar Button position */
  position: relative;
  top: 20%;
  left: 0%;
  width: 22em;
  height: 60%;
  max-width: 93%;
  max-height: 80%;

  line-height: 150%;

  background-color: #92c4e0;
  /* Same color as sidebar background */
}

.navbar-a:hover {
  transform: translate(0, 0);
  clip-path: polygon(
    0% var(--d),
    var(--d) 0%,
    100% 0%,
    100% calc(100% - var(--d)),
    calc(100% - var(--d)) 100%,
    0% 100%
  );

  color: #ffffff;
  cursor: pointer;
}

a:hover {
  background-position: left;
}

.menu-container {
  display: flex;

  position: absolute;
  width: 15%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;

  padding-left: 0%;
  padding-right: 0%;
  top: 0%;
  bottom: 0%;
  margin-left: -0.5em;
  background: #92c4e0;

  box-shadow: 2px 2px 20px rgb(172, 197, 221);
  /* border-top: #506698;
    border-bottom: #506698; */
}

.navbar {
  display: flex;
  justify-content: space-around;

  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 3%;

  position: absolute;
  top: 15%;

  width: 100%;
  height: 40%;
  max-width: 100%;
  max-height: 100%;
}

/* Logo Inside the Side bar */
.logo {
  width: 100%;
  height: 80%;
  max-width: 100%;
  max-height: 80%;
  min-width: 100%;
  min-height: 80%;
  mix-blend-mode: multiply;
}

.logo-div {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 7.5%;
  margin: 0%;
  border: 0%;
  padding: 0%;
}

/* Add Post Button */
.home {
  margin: 0px;
  border: 0px;
  padding: 0px;

  width: 50px;
  height: 50px;

  position: absolute;
  bottom: 60%;
  left: 50%;
}

/* Register top blue bar */
.top {
  background-color: black;
  visibility: hidden;
}

/* Icons at left side bar*/
.home-icon {
  width: 1.2em;
  mix-blend-mode: multiply;
  position: absolute;
  left: 5%;
}

.register-icon {
  width: 1.2em;
  mix-blend-mode: multiply;
  position: absolute;
  left: 5%;
}

.login-icon {
  width: 1.2em;
  mix-blend-mode: multiply;
  position: absolute;
  left: 5%;
}

.test-icon {
  width: 1.2em;
  mix-blend-mode: multiply;
  position: absolute;
  left: 5%;
}

.userlist-icon {
  width: 1.2em;
  mix-blend-mode: multiply;
  position: absolute;
  left: 5%;
}

.conversation-icon {
  width: 1.2em;
  mix-blend-mode: multiply;
  position: absolute;
  left: 5%;
}
</style>