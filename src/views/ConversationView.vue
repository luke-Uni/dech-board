<template>
  <div class="home">

<ChatView/>
    
    
  
  </div>
</template>

<script>
// @ is an alias to /src
// import { ref } from "vue";
import ChatView from "@/components/ChatView.vue";



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
    ChatView
},
  methods: {},
};
</script>