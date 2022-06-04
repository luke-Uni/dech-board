
<template>


  <div>
    
    <div class="send_messages"></div>
    
    <div class="insert_message">
      
      <div class="popup">
        <div class="popup-inner">
          <slot />

          <br />

          <div>
            <div class="message-create">
              <div class="message-textarea-div">
                <textarea
                  class="textarea-content"
                  name="content"
                  rows="3"
                  cols="55"
                  v-model="content"
                  placeholder="Your first Message..."
                >
                </textarea>
                <div class="send-button-div">
                  <button
                    class="button-81"
                    v-on:click="createMessage()"
                    role="button"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>
    <!-- <div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label> -->

    <div class="own_user">
      
    </div>

    <div class="conversationview">
      
      <!-- <div>Select Users:{{checkedNames}} </div>
    <div v-for="user in users" :key="user.username" class="selectFromUserList">
    <input type="checkbox" value={{user.username}}  v-model="checkedNames"/> -->
<!-- 
    <label for={{user.username}}>{{user.username}}</label> -->
    <!-- <label><input type="checkbox" id={{user.username}} value={{user.username}} v-model="checkedNames"> {{user.username}}</label> -->

    <!-- </div> -->

    <v-container fluid>
    <p>{{recipients }}</p>
    <div v-for="user in users" :key="user.username">
    <input type="checkbox"
      @click="()=>{selectUsers(user.username)}"
      :value="user.username"
    >
    {{user.username}}
    </div>
  </v-container>
      
    </div>
    
  </div>

  
</template>

<script>
import axios from "axios";
// import VueLodash from 'vue-lodash'
// import lodash from 'lodash'

export default {
  data() {
    return {
     // conversations: [],
     // messages: [],
      //recipient: "",
      content: "",
      users: [],
      recipients: [],
      //checkedNames:[],
      
      
    };
  },
  computed: {},
  beforeMount() {
    //this.getAllConversations();
    this.getAllUsers();
  },

  methods: {
    selectUsers(id){
          //in here you can check what ever condition  before append to array.
          if(this.recipients.includes(id)){
            const index = this.recipients.indexOf(id);
             
              this.recipients.splice(index, 1);
          }else{
              this.recipients.push(id)
          }
      },

    // setUsername(username){
    //     if(this.recipients.includes(username)){
    //           this.recipients.without(this.recipients,username)
    //           var i=0;
    //           for(i =0; i<this.recipients.length;i++){
    //             if(username == this.recipients[i]){
    //               this.recipients.splice(username,1)
    //             }
    //           }
    //           this.recipients.pop(username)
    //       }else{
    //           this.recipients.push(username)
    //       }
    // },

    createDate() {
      for (let index = 0; index < this.messages.length; index++) {
        let newDate = new Date(this.messages[index].time);
        this.messages[index].time = newDate.toTimeString();
        console.log("CreateDate");
      }
    },
    async getAllUsers() {
      //console.logs("workung (UserList funct.)");

      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };
      let uri = "http://localhost:8090/getUsers";

      let response = await axios
        .get(uri, { headers: headers })
        .then((response) => {
          this.users = response.data;
        });
      console.log(response);
    },

    //Get all Messages for one conversation using the other users username as a parameter
    // async getAllPosts(name) {
    //   // localStorage.setItem("recipient", name);
    //   localStorage.setItem("conversationID", name);

    //   let headers = {
    //     "Content-Type": "application/json",
    //     authorization: localStorage.getItem("token"),
    //   };

    //   let uri = "http://localhost:8090/message/getall/" + name;
    //   //send synchron Request to Server
    //   let response = await axios
    //     .get(uri, { headers: headers })
    //     .then((response) => {
    //       console.log(response);

    //       this.messages = response.data;
    //     })
    //     //save all Posts locally
    //     .then((data) => (this.user = data))
    //     .catch((e) => {
    //       this.errors.push(e);
    //     });

    //   this.createDate();

    //   console.log(response);
    // },

    //get all Messages from one Conversation without having to use parameters
    // async getAllPostsNoParameter() {
    //   let headers = {
    //     "Content-Type": "application/json",
    //     authorization: localStorage.getItem("token"),
    //   };

    //   let name = localStorage.getItem("conversationID");
    //   console.log(localStorage.getItem("conversationID"));
    //   let uri = "http://localhost:8090/message/getall/" + name;
    //   //send synchron Request to Server
    //   let response = await axios
    //     .get(uri, { headers: headers })
    //     .then((response) => {
    //       console.log(response);

    //       this.messages = response.data;
    //     })
    //     //save all Posts locally
    //     .then((data) => (this.user = data))
    //     .catch((e) => {
    //       this.errors.push(e);
    //     });

    //   console.log(response.constructor);
    // },

    //To display all the Conversations we need to get them from the Server
    // async getAllConversations() {
    //   console.log("I am in the getAllPosts function");

    //   let headers = {
    //     "Content-Type": "application/json",
    //     authorization: localStorage.getItem("token"),
    //   };

    //   let uri = "http://localhost:8090/conversation/getall";

    //   let response = await axios
    //     .get(uri, { headers: headers })
    //     .then((response) => {
    //       console.log(response);

    //       this.conversations = response.data;
    //     })
    //     //save all Conversations
    //     .then((data) => (this.user = data))
    //     .catch((e) => {
    //       this.errors.push(e);
    //     });

    //   console.log(response.constructor);
    // },
    //Create a message
    async createMessage() {
      this.recipients.push(this.recipient);
      console.log(this.recipients);
      if (this.recipient.length > 0) {
        let result = await axios.post(
          "http://localhost:8090/message/create",
          {
            //recipient: this.recipient,
            recipients: this.recipients,
            content: this.content,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(result);
      } else {
        let result = await axios.post(
          "http://localhost:8090/message/create",
          {
            recipient: localStorage.getItem("recipient"),
            //recipient: this.recipient,
            content: this.content,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );

        console.log(result);
      }
      //this.getAllConversations();
      //this.getAllPostsNoParameter();
    },
  },
};
</script>

<style scoped lang="scss">







.insert_message {
  position: absolute;

  width: 37.8125em;
  height: 3.75em;
  left: 6.25em;
  top: 3.375em;
  background: #f4f7ff;
  border-radius: 0.625em;
  margin-top: 42.5em;
  margin-left: 25em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255);
}

.messages_view {
  margin-bottom: 2em;
  height: 1em;
}







.conversationview {
  position: absolute;
  width: 16.125em;
  height: 20.4em;
  left: 27.1875em;
  top: 16.375em;
  background: #f4f7ff;
  border-radius: 1.3125em;
  margin-top: 6em;
  margin-left: 25em;
  border: 1px solid #f4f7ff;
  padding: 0.5em;
  //box-shadow: 2px 2px 7px rgb(198, 227, 255);

  overflow: scroll;
  overflow-x: hidden;
}

.conversationview::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 1em;

}
.conversationview::-webkit-scrollbar {
  background-color: #f5f5f5;
  border-radius: 1em;
   width: 1.7em;
}
.conversationview::-webkit-scrollbar-thumb {
  background-color: #e1e7f7;
  border-radius: 1em;
}






.popup-inner {
  background: white;
  padding: 32px;
  border-radius: 10px;
}

.table-left {
  margin: auto;
}

.td-left {
  padding-left: 35em;
}

.message-create {
  display: block;
  white-space: pre;
}








.message-create {
  width: 38em;

  padding: 0em;
  // margin: auto;
  margin-left: -2em;
  margin-top: -4.4em;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  background-color: rgba(244, 247, 255, 255);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  // position: absolute;
}
.message-textarea-div {
  height: 5em;
}
.textarea-content {
  width: 70%;
  height: 55%;
  margin-left: 1em;
  margin-top: 1.2em;
  resize: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: none;
  outline: none;
  float: left;
  padding-left: 3px;
  padding-right: 3px;
}
.send-button-div {
  width: 22%;
  height: 100%;
  float: right;
  padding-right: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* CSS */
.button-81 {
  width: 100vh;
  background-color: rgba(244, 247, 255, 255);
  border: 0 solid #e2e8f0;
  border-radius: 1.5rem;
  box-sizing: border-box;
  color: #0d222a;
  cursor: pointer;
  display: inline-block;
  font-family: "Basier circle", -apple-system, system-ui, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1;
  padding: 0.8rem 0.5rem;
  text-align: center;
  text-decoration: none rgba(244, 247, 255, 255) solid;
  text-decoration-thickness: auto;
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 1px 2px rgba(118, 162, 255, 0.25);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-81:hover {
  background-color: rgba(102, 194, 247, 0.25);
  color: rgb(0, 0, 0);
}

@media (min-width: 768px) {
  .button-81 {
    font-size: 0.9rem;
    padding: 0.8rem 0.5rem;
  }
}



@media (min-width: 768px) {
  .button-81 {
    font-size: 0.9rem;
    padding: 0.8rem 0.5rem;
  }
}
</style>