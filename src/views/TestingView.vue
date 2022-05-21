<template>
  <div>
    <LeftSideMenu/>


    <h1>Only Test Components</h1>
    <InvitationLink />
    <br>
    <br>
    <MessageCreation/>
  </div>
</template>

<script>
import InvitationLink from "@/components/InvitationLink.vue";
import MessageCreation from "@/components/MessageCreation.vue";
import LeftSideMenu from "@/components/LeftSideMenu.vue";


export default {
  components: {
    InvitationLink,
    MessageCreation,
    LeftSideMenu
},
};
</script>

<style scoped>
</style>