<template>
  <div>
    <LeftSideMenu />

    <h1>Only Test Components</h1>
    <h2>bla</h2>
    <InvitationLink />
    <!-- <CreateConversation/> -->

    <UserObjects/>

    
  </div>
  <button  @click="() => TogglePopup('buttonTrigger')">Click me</button>
  
  <emoji-picker   v-if="popupTriggers.buttonTrigger"
      :TogglePopup="() => TogglePopup2('buttonTrigger')"></emoji-picker>

 

</template>
<script>
import InvitationLink from "@/components/InvitationLink.vue";

import LeftSideMenu from "@/components/LeftSideMenu.vue";
import UserObjects from "@/components/UserObjects.vue";
//import axios from "axios";
import { ref } from "vue";


import "emoji-picker-element";

// import CreateConversation from "@/components/CreateConversation.vue";

export default {
  components: {
    InvitationLink,
    LeftSideMenu,
    
    UserObjects,
    // CreateConversation
    
},
setup() {
    const popupTriggers = ref({
      buttonTrigger: false,
    });

    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };

    const TogglePopup2 = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };

    return {
      popupTriggers,
      TogglePopup,
      TogglePopup2,
    };
  },

data() {
    
    return {
      togglePopu:"false"
    };
  },

methods:{



}

};
</script>

<style scoped>
</style>