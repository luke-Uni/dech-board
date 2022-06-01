<template>
  <div>
    <LeftSideMenu />

    <h1>Only Test Components</h1>
    <h2>bla</h2>
    <InvitationLink />

    <UserObject />
    <RachidUserObjects/>

    <br />
    <br />
  </div>

  
</template>

<script>
import InvitationLink from "@/components/InvitationLink.vue";

import LeftSideMenu from "@/components/LeftSideMenu.vue";
import UserObject from "@/components/UserObject.vue";
import RachidUserObjects from "@/components/RachidUserObjects.vue";

export default {
  components: {
    InvitationLink,
    LeftSideMenu,
    UserObject,
    RachidUserObjects
    
},
};
</script>

<style scoped>
</style>