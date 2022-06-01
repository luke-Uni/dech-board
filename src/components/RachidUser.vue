<template>
  <article>
    <h3>{{ user.username }}</h3>
   
  </article>
</template>
<script>
export default {
  props: ["user"]
};
</script>