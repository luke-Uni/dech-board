<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <MessageBoard />
  </div>
</template>

<script>
// @ is an alias to /src
import MessageBoard from "@/components/MessageBoard.vue";

export default {
  name: "MessageBoard",
  components: {
    MessageBoard,
  },
};
</script>
