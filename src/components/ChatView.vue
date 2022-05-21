
<template>
  <div>
      <div class="selecteduser">
      </div>

      <div class="chat"></div>

<div class="conversationview">
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
    
      let uri = "http://localhost:8090/conversation/getall";
      
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

  position: absolute;
  
  width: 37.8125em;
  height: 3.75em;
  left: 6.25em;
  top: 3.375em;
  background: #F4F7FF;
  border-radius: 0.625em;
  margin-top: 7em;
  margin-left: 25em;
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
}
</style>