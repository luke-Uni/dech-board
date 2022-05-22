
<template>
  <div>
      <div class="selecteduser">
      </div>

      <div class="chat">
        <div class="messages_view">
        <MessageRetrieve ref="messageRetrieve"/>
    </div>
    <div class="send_messages">

    </div>
      </div>
      <div class="insert_message">
        <MessageCreation/>
      </div>

<div class="conversationview">
<div class="postComplete" v-for="conversation in conversations" :key="conversation.user1">
    <div class="conversation_segment"> 
      <!-- <input type="button" v-on:click="getAllPosts()" v-model="recipient">{{ conversation.user2 }} </input> -->
      
      <button v-on:click="getAllPosts( conversation.user2 )">{{conversation.user2}}</button>
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
import MessageRetrieve from "./MessageRetrieve.vue";
import MessageCreation from "./MessageCreation.vue";
import axios from "axios";

export default {
  data() {
    return {
      conversations: [],
      messages:[],
      recipient:""
    };
  },
  beforeMount() {
    this.getAllConversations();
    
  },
  components: {
    MessageRetrieve,
    MessageCreation
},
  methods: {
    getAllPosts(name) {
      //console.log("I am in the getAllPosts function");

      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };
      //console.log(localStorage.getItem("currentuser"));
      // let uri = "http://localhost:8090/message/getall";
      // var name = localStorage.getItem("recipient");
      //var name =this.recipient ;
      let uri = "http://localhost:8090/message/getall/" + name;
      //send synchron Request to Server
      let response = axios
        .get(uri, { headers: headers })
        .then((response) => {
          console.log(response);

          this.messages = response.data;
        })
        //save all Posts locally
        .then((data) => (this.user = data))
        .catch((e) => {
          this.errors.push(e);
        });

      console.log(response.constructor);
    },
    // getAllPosts(){
    //   this.$refs.messageRetrieve.getAllPosts();
    // },
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
.insert_message{
  position: absolute;
  
  width: 37.8125em;
  height: 3.75em;
  left: 6.25em;
  top: 3.375em;
  background: #F4F7FF;
  border-radius: 0.625em;
  margin-top: 42.5em;
  margin-left: 25em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255);
}

.messages_view{
  margin-bottom: 2em;
  height: 1em;
}

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
  height: 28.9em;
  left: 6.25em;
  top: 8.375em;
  background: #F4F7FF;
  border-radius: 1.1875em;  
  margin-top: 7.4375em;
  margin-left: 25em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255)  ;
  overflow:scroll;
    overflow-x:hidden
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