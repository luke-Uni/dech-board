<template>

<LeftSideMenu />
<div>
<h1>List of all User</h1>
 
</div>
<UserObjects/>
</template>


<script>
import LeftSideMenu from "@/components/LeftSideMenu.vue";
import UserObjects from "@/components/UserObjects.vue";

export default {
  components: {
    UserObjects,
    LeftSideMenu
    
},
};

</script>

