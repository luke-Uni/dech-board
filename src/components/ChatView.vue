
<template>
  <div>
      <div class="selecteduser">
          <div class= "myUserAcc">
          </div>
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
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
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
  width: 605px;
  height: 548px;
  left: 100px;
  top: 134px;
  background: #F4F7FF;
  border-radius: 19px;  
   margin-top: 7em;
  margin-left: 25em;
}

.conversationview{
  position: absolute;
  width: 402px;
  height: 612px;
  left: 723px;
  top: 70px;

  background: #F4F7FF;
  border-radius: 21px;
   margin-top: 7em;
   margin-left: 25em;
}

.myUseracc{
  box-sizing: border-box;
  position: absolute;
  width: 402px;
  height: 83px;
  left: 723px;
  top: 51px;

  background: #F4F7FF;
  border: 1px solid #B4ADAD;
  border-radius: 22px;
  
}


</style>