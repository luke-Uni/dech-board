<template>


<SlideShow/>
<LeftSideMenu />
<div>
<h1>List of all User</h1>
 
</div>
<UserObjects/>

</template>



<script>
import SlideShow from "@/components/SlideShow.vue";
import LeftSideMenu from "@/components/LeftSideMenu.vue";
import UserObjects from "@/components/UserObjects.vue";

export default {
  components: {
    UserObjects,
    LeftSideMenu,
    SlideShow
    
},
};

</script>

