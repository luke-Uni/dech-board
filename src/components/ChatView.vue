
<template>
  <div>
      <div class="selecteduser">
      </div>

      <div class="chat"></div>

<div class="conversationview">
<div class="postComplete" v-for="conversation in conversations" :key="conversation.user1">
    <div class="conversation_segment"> 
      {{ conversation.user2 }} <br>
      <br>
     <p> {{ conversation.lastMessageSend }}</p>
      </div> 
        
          
        
        <!-- <p class="postText">{{ conversation.lastMessageSend }}</p> -->
        <p>
          
        </p>
      
    </div>


</div>

    
    </div> 
  
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      conversations: [],
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
    
      let uri = "http://localhost:8090/conversation/getall";
      
      let response = axios
        .get(uri, { headers: headers })
        .then((response) => {
         console.log(response);
        
          this.conversations = response.data;
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

.conversation_segment{
  height: 5em;
  width: 23.7em;
  background: rgb(230, 246, 255);
  text-align:center;
  border-radius: 1.3125em;
  margin-top: 0.1em;
  margin-left: 0.4em;
  margin-bottom: -0.5em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255);
  border: 1px solid rgb(230, 230, 230);
  padding: 0.2em;
}

.selecteduser{

  position: absolute;
  
  width: 37.8125em;
  height: 3.75em;
  left: 6.25em;
  top: 3.375em;
  background: #F4F7FF;
  border-radius: 0.625em;
  margin-top: 7em;
  margin-left: 25em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255);
}

.chat{
  position: absolute;
  width: 37.8125em;
  height: 34.25em;
  left: 6.25em;
  top: 8.375em;
  background: #F4F7FF;
  border-radius: 1.1875em;  
  margin-top: 7.4375em;
  margin-left: 25em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255)
}

.conversationview{
  position: absolute;
  width: 25.125em;
  height: 39.40em;
  left: 45.1875em;
  top: 4.375em;

  background: #F4F7FF;
  border-radius: 1.3125em;
   margin-top: 6em;
   margin-left: 25em;
   box-shadow: 2px 2px 7px rgb(198, 227, 255);
}
</style>