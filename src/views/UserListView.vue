<template>

<LeftSideMenu />
<div>
<h1>Userlist</h1>
 <UserObject />
 
</div>
</template>


<script>
import UserObject from "@/components/UserObject.vue";
import LeftSideMenu from "@/components/LeftSideMenu.vue";

export default {
  components: {
    
    UserObject,
    LeftSideMenu
    
},
};

</script>

