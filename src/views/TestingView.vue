<template>
  <div>
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
export default {
  components: {
    InvitationLink,
    MessageCreation
  },
};
</script>

<style scoped>
</style>