<template>
  <div>
    <LeftSideMenu />

    <h1>Only Test Components</h1>
    <h2>bla</h2>
    <InvitationLink />
    <!-- <CreateConversation/> -->

    <UserObjects/>

    <!-- <br />
    <br /> -->
  </div>
  <!-- <CreateConversation/> -->
  
</template>

<script>
import InvitationLink from "@/components/InvitationLink.vue";

import LeftSideMenu from "@/components/LeftSideMenu.vue";
import UserObjects from "@/components/UserObjects.vue";
// import CreateConversation from "@/components/CreateConversation.vue";

export default {
  components: {
    InvitationLink,
    LeftSideMenu,
    
    UserObjects,
    // CreateConversation
    
},
};
</script>

<style scoped>
</style>