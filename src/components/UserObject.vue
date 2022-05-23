<template>
<div class="layoutUser">

<h1 class="userUsername">{{ username }}</h1>
<h2 class="userPasswort">{{ passwort }}</h2>
<h3 class="userEmail">{{ email }}</h3>



</div>
</template>




<script>
export default {

 name: "UserObjekt",
 data() {
   
    return {
      username: "arvand",
      passwort:"123",
      email:"arvand@fra-uas.de",
    };
  },

}



</script>

<style scoped>
.layoutUser{
  margin-top: 1em;
  margin-bottom: 1em;
}



</style>
