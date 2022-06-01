<template>
  <article>
    <h3>{{ user.username }}</h3>
    
    <button >Add Friend</button>
    <button>Start Conversation</button>
   
  </article>
</template>
<script>
export default {
  props: ["user"]
};
</script>