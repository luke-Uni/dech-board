<template>
  <div>
    <div class="posts">
      <h3 class="title">{{ title }}</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "Title",
      text: "That is the text",
      upVotes: 7,
      downVotes: 2,
    };
  },
  methods: {
    async getAllPosts() {
      let headers = {};

      let uri = "";

      let res = await axios.get(uri, { headers: headers });

      console.log(headers);
    },
  },
};
</script>

<style scoped>
.posts {
  align-content: center;
  border: 3px solid black;
  width: 20%;
  height: 10%;
}
</style>