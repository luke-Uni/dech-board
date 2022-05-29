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
  //   setup() {
  //     const popupTriggers = ref({
  //       buttonTrigger: false,
  //     });

  //     const TogglePopup = (trigger) => {
  //       popupTriggers.value[trigger] = !popupTriggers.value[trigger];
  //     };

  //     const TogglePopup2 = (trigger) => {
  //       popupTriggers.value[trigger] = !popupTriggers.value[trigger];
  //     };

  //     return {
  //       popupTriggers,
  //       TogglePopup,
  //       TogglePopup2,
  //     };
  //   },

  components: {
    ChatView,
    LeftSideMenu,
    InvitationLink,
  },
  methods: {},
};
</script>