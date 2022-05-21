
<template>
  <div>
      <div class="selecteduser">

      </div>

      <div class="chat"></div>

<div class="conversationview"></div>

    <div class="postComplete" v-for="message in messages" :key="message.username">
      
       </div>
    </div> 
  
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      messages: [],
    };
  },
  beforeMount() {
    this.getAllConversations();
  },
  methods: {
    //To display all the Conversations we need to get them from the Server
    getAllConversations() {
      console.log("I am in the getAllPosts function");

      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };
    
      let uri = "http://localhost:8090/conversation/getall/";
      
      let response = axios
        .get(uri, { headers: headers })
        .then((response) => {
         console.log(response);

          this.messages = response.data;
        })
        //save all Conversations 
        .then((data) => (this.user = data))
        .catch((e) => {
          this.errors.push(e);
        });

      console.log(response.constructor);
    },
  },
};
</script>

<style scoped>

.selecteduser{
    
}


</style>