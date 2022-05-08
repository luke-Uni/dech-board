<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <MessageBoard ref="" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/MessageBoard.vue";

export default {
  name: "MessageBoard",
  components: {
    MessageBoard,
  },
};
</script>
