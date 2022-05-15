<template>
  <div class="home">
    <MessageBoard />
  
    <CreatePost v-if="popupTriggers.buttonTrigger">
    
      </CreatePost>

    <div id="addButtonOutsite">
      <div class="button_plus"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {ref} from 'vue';
import MessageBoard from "@/components/MessageBoard.vue";
import CreatePost from "@/components/CreatePost.vue"


export default {

setup(){
  const popupTriggers = ref({
    buttonTrigger: true,
    timedTrigger: false
  });
  return{
    popupTriggers
  }
},

  components: {
    MessageBoard,
    CreatePost
    
},
};
</script>

<style scoped>
#addButtonOutsite {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  height: 5em;
  width: 100vw;
}

.button_plus {
  position: absolute;
  width: 35px;
  height: 35px;
  background: #fff;
  cursor: pointer;
  border: 2px solid #095776;

  /* Mittig */
  top: 50%;
  left: 50%;
}

.button_plus:after {
  content: "";
  position: absolute;
  transform: translate(-50%, -50%);
  height: 4px;
  width: 50%;
  background: #095776;
  top: 50%;
  left: 50%;
}

.button_plus:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #095776;
  height: 50%;
  width: 4px;
}

.button_plus:hover:before,
.button_plus:hover:after {
  background: #fff;
  transition: 0.2s;
}

.button_plus:hover {
  background-color: #095776;
  transition: 0.2s;
}
</style>