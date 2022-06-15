<template>
  <div>
    <LeftSideMenu />

    <h1>Only Test Components</h1>
    <h2>bla</h2>
    <InvitationLink />
    <!-- <CreateConversation/> -->

    <UserObjects />
    <!-- <div class="home-page">
      <textarea-emoji-picker v-model="text" />
    </div> -->
    <!-- <br />
    <br /> -->
  </div>
  <!-- <CreateConversation/> -->

<div class="home-page">
    <textarea-emoji-picker
      v-model="text"
    />
  </div>


</template>

<script>

import InvitationLink from "@/components/InvitationLink.vue";

import LeftSideMenu from "@/components/LeftSideMenu.vue";
import UserObjects from "@/components/UserObjects.vue";
import TextareaEmojiPicker from "@/components/TextareaEmojiPicker.vue";

// import CreateConversation from "@/components/CreateConversation.vue";

export default {
  components: {
    InvitationLink,
    LeftSideMenu,
    TextareaEmojiPicker,
    UserObjects,
    // CreateConversation
  },
  data() {
    return {
      text: "",
    };
  },
};
</script>

<style scoped>
</style>