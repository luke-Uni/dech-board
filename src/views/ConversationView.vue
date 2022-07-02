<template>
  <LeftSideMenu />

  <div class="home">
    <ChatView />
  </div>
  <div>
    <InvitationLink />
  </div>
</template>

<script>
// @ is an alias to /src
// import { ref } from "vue";
import ChatView from "@/components/ChatView.vue";
import LeftSideMenu from "@/components/LeftSideMenu.vue";
import InvitationLink from "@/components/InvitationLink.vue";
export default {


  components: {
    ChatView,
    LeftSideMenu,
    InvitationLink,
  },
  methods: {},
};
</script>
<style scoped>

.home{
  position: absolute; 
  top: 0em;
  left: 11em;
  width: 90%;
  height: 100%;
}

</style>