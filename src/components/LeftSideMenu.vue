<template>

<div class="searchUser">

</div>

  <div class="menu-container">
    <img src="../assets/1.png" alt="HeNan" id="logo" class="picture" />
    <div class="navbar">
      <a @click="this.$router.push('/')">Home</a>
      <a @click="this.$router.push('/registeruser')">Register</a>
      <a @click="this.$router.push('/login')">Login</a>
      <a @click="this.$router.push('/test')">Test</a>
      <a @click="this.$router.push('/userlistview')">Userlist</a>
      <a @click="this.$router.push('/conversationview')">conversation</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "NavBar",
};
</script>

<style>
a {
  color: #506698;
  text-decoration: none;
}

a:hover {
  color: white;
}

.menu-container {
  position: absolute;
  width: 232px;
  height: 900px; 
  padding-left: 0%;
  padding-right: 0%;
  top: 0%;
  bottom: 0%;
  margin-left: -0.5em;
  background: #92c4e0;
}
.navbar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 28px;

  position: absolute;
  width: 152px;
  left: calc(50% - 152px / 2);
  top: 22.22%;
  bottom: 40.44%;
}

.picture {
  position: absolute;
  width: 232px;
  height: 73px;
  left: 0px;
  top: 35px;

  mix-blend-mode: multiply;
}

  .searchUser{
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
}


</style>