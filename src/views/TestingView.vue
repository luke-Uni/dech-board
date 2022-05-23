<template>
  <div>
    <LeftSideMenu />

    <h1>Only Test Components</h1>
    <h2>bla</h2>
    <InvitationLink />

    <AllUserList />

    <br />
    <br />
  </div>
</template>

<script>
import InvitationLink from "@/components/InvitationLink.vue";

import LeftSideMenu from "@/components/LeftSideMenu.vue";
import AllUserList from "@/components/AllUserList.Second.vue";

export default {
  components: {
    InvitationLink,

    LeftSideMenu,
    AllUserList,
  },
};
</script>

<style scoped>
</style>