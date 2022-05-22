<template>
  <div>
    <LeftSideMenu/>


    <h1>Only Test Components</h1>
    <InvitationLink />
    <br>
    <br>
    
  </div>
</template>

<script>
import InvitationLink from "@/components/InvitationLink.vue";

import LeftSideMenu from "@/components/LeftSideMenu.vue";


export default {
  components: {
    InvitationLink,
    
    LeftSideMenu
},
};
</script>

<style scoped>
</style>