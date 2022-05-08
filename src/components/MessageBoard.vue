<template>
  <div>
    <div class="posts">
      <h3 class="title">{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Title",
      upVotes: 7,
      downVotes: 2,
    };
  },
};
</script>

<style scoped>
.posts {
  border: 3px solid black;
  width: 20%;
  height: 10%;
}
</style>