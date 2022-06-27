<template>
  <div>
    <h1>Only Test Components</h1>
  </div>

  <button style="border: none" @click="() => TogglePopup('buttonTrigger')">
    Emoji😀
  </button>

  <textarea id="input" cols="30" rows="10" v-model="text"></textarea>

  <emoji-picker
    v-if="popupTriggers.buttonTrigger"
    @click="emojiEvent()"
  ></emoji-picker>
</template>

<script>
import { ref } from "vue";
import "emoji-picker-element";

export default {
  name: "HelloWorld",
  setup() {
    const popupTriggers = ref({
      buttonTrigger: false,
    });
    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };
    return {
      popupTriggers,
      TogglePopup,
    };
  },

  data() {
    return {
      text: "",
      togglePopu: "true",
    };
  },

  methods: {
    emojiEvent() {
      document
        .querySelector("emoji-picker")
        .addEventListener("emoji-click", (event) => {
          let input = document.getElementById("input");
          let startPos = input.selectionStart;
          let endPos = input.selectionEnd;
          let resultText =
            input.value.substring(0, startPos) +
            event.detail.unicode +
            input.value.substring(endPos);
          input.value = resultText;
          input.focus();
          input.selectionStart = startPos + event.detail.unicode.length;
          console.log(input.selectionStart)
          input.selectionEnd = startPos + event.detail.unicode.length;
          console.log(input.selectionEnd)
          this.text = resultText;
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
