<template>
  <div>
    <LeftSideMenu />

    <h1>Only Test Components</h1>
    <h2>bla</h2>
    <DropZone class="dropZone" />
    <!-- <CreateConversation/> -->

    <UserObjects />
    <MessageBoardSelection/>
  </div>
  <button @click="() => TogglePopup('buttonTrigger')">Click me</button>

  <textarea name="" id="" cols="30" rows="10"></textarea>

  <emoji-picker
    v-if="popupTriggers.buttonTrigger"
    :TogglePopup="() => TogglePopup2('buttonTrigger')"
    @click="emojiEvent()"
  ></emoji-picker>
</template>
<script>
import LeftSideMenu from "@/components/LeftSideMenu.vue";
import UserObjects from "@/components/UserObjects.vue";
import DropZone from "@/components/DropZone.vue";
//import axios from "axios";
import { ref } from "vue";

import MessageBoardSelection from "@/components/MessageBoardSelection.vue";

import "emoji-picker-element";

//import insert from 'insert-text-2';

// import CreateConversation from "@/components/CreateConversation.vue";

export default {
  components: {
    LeftSideMenu,
    DropZone,
    UserObjects,
    MessageBoardSelection
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
      togglePopu: "false",
    };
  },

  methods: {
    emojiEvent() {
      document
        .querySelector("emoji-picker")
        .addEventListener("emoji-click", (event) => console.log(event.detail));
    },

    addEmoji(emoji) {
      document
        .querySelector("emoji-picker")
        .addEventListener("emoji-click", (event) => console.log(event.detail));

      const textarea = this.$refs.textarea;
      const cursorPosition = textarea.selectionEnd;
      const start = this.value.substring(0, textarea.selectionStart);
      const end = this.value.substring(textarea.selectionStart);
      const text = start + emoji.native + end;
      this.$emit("input", text);
      textarea.focus();
      this.$nextTick(() => {
        textarea.selectionEnd = cursorPosition + emoji.native.length;
      });
    },
  },
};
</script>

<style scoped>
.dropZone {
  margin-left: 30em;
}
</style>