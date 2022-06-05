<template>
  <div>
    <LeftSideMenu />

    <h1>Only Test Components</h1>
    <h2>bla</h2>
    <InvitationLink />

    <UserObjects/>

    <br />
    <br />
  </div>

  
</template>

<script>
import InvitationLink from "@/components/InvitationLink.vue";

import LeftSideMenu from "@/components/LeftSideMenu.vue";
import UserObjects from "@/components/UserObjects.vue";

export default {
  components: {
    InvitationLink,
    LeftSideMenu,
    UserObjects
    
},
};
</script>

<style scoped>
</style>