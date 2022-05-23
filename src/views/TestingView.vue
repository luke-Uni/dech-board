<template>
  <div>
    <LeftSideMenu />

    <h1>Only Test Components</h1>
    <h2>bla</h2>
    <InvitationLink />

    <AlluserList />

    <br />
    <br />
  </div>
</template>

<script>
import InvitationLink from "@/components/InvitationLink.vue";

import LeftSideMenu from "@/components/LeftSideMenu.vue";
//import AlluserList from "@/components/AlluserList.vue";

export default {
  components: {
    InvitationLink,

    LeftSideMenu,
    AlluserList,
  },
};
</script>

<style scoped>
</style>