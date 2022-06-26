<template>
  <div>
    <div class="selecteduser"></div>

    <div class="chat">
      <div class="messages_view">
        <div>
          <div
            class="postComplete"
            v-for="message in messages"
            :key="message.username"
          >
            <h4 class="postUsername">User: {{ message.username }}</h4>
            <div :class="[message.send ? 'postsInside2' : 'postsInside']">
              <!-- <div :class="[post.important ? 'importantPost' : 'postsInside']"></div> -->
              <!-- <p class="recipient">Recipient: {{ message.recipient }}</p> -->
              <p class="recipient">{{ message.username }}</p>

              <p class="postText">{{ message.content }}</p>
              <p class="timeStamp">{{ message.time }}</p>
              <br />
              <!-- <p class="directionState">{{ message.state }}</p> -->
            </div>
          </div>
        </div>
      </div>
      <div class="send_messages"></div>
    </div>
    <div class="insert_message">
      <div></div>
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

    <div class="own_user">
      Create a Conversation &nbsp; &nbsp; &nbsp;
      <!-- <button
        class="icon-btn add-btn"
        @click="() => TogglePopup('buttonTrigger')"
      > -->

      <!-- </button> -->
      <img
        src="@/assets/edit.png"
        alt="Create Conversation"
        @click="() => TogglePopup('buttonTrigger')"
        id="editIcon"
      />
    </div>
    <CreateConversation
      v-if="popupTriggers.buttonTrigger"
      :TogglePopup="() => TogglePopup2('buttonTrigger')"
    />

    <div class="conversationview">
      <!--<div class="own_user">
        "Issam"
      </div> <!-->
      <div
        class="postComplete"
        v-for="conversation in conversations"
        :key="conversation.id"
      >
        <button
          class="button-conversation"
          v-on:click="getAllPosts(conversation.id)"
          role="button"
        >
          <ul>
            <li
              class="same"
              v-for="name in conversation.conversationParticipants"
              :key="name"
            >
              {{ name }},&nbsp;
            </li>
          </ul>

          <!-- <p>{{ conversation.lastMessageSend }}</p> -->
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import CreateConversation from "./CreateConversation.vue";
export default {
  components: {
    CreateConversation,
  },
  created() {
    this.interval = setInterval(() => {
      this.getAllPostsNoParameter();
    }, 2000);
  },
  setup() {
    const popupTriggers = ref({
      buttonTrigger: false,
    });
    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };
    const TogglePopup2 = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };
    return {
      popupTriggers,
      TogglePopup,
      TogglePopup2,
    };
  },
  data() {
    return {
      conversations: [],
      messages: [],
      recipient: "",
      content: "",
      users: [],
      recipients: [],
    };
  },
  computed: {},
  beforeMount() {
    this.getAllConversations();
    this.getAllUsers();
  },
  methods: {
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
    async getAllPosts(name) {
      // localStorage.setItem("recipient", name);
      localStorage.setItem("conversationID", name);
      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };
      let uri = "http://localhost:8090/message/getall/" + name;
      //send synchron Request to Server
      let response = await axios
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
      this.createDate();
      console.log(response);
    },
    //get all Messages from one Conversation without having to use parameters
    async getAllPostsNoParameter() {
      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };
      let name = localStorage.getItem("conversationID");
      console.log(localStorage.getItem("conversationID"));
      let uri = "http://localhost:8090/message/getall/" + name;
      //send synchron Request to Server
      let response = await axios
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
    //To display all the Conversations we need to get them from the Server
    async getAllConversations() {
      console.log("I am in the getAllPosts function");
      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };
      let uri = "http://localhost:8090/conversation/getall";
      let response = await axios
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
      var index;
      console.log(this.conversations.length);
      //Delete own username from chat participants
      for (var i = 0; i < this.conversations.length; i++) {
        console.log(this.conversations[i]);
        if (
          this.conversations[i].conversationParticipants.includes(
            localStorage.getItem("currentuser")
          )
        ) {
          index = this.conversations[i].conversationParticipants.indexOf(
            localStorage.getItem("currentuser")
          );
          this.conversations[i].conversationParticipants.splice(index, 1);
          console.log("Indeex: " + index);
        }
      }
      console.log(response);
    },
    //Create a message
    async createMessage() {
      //this.recipients.push(this.recipient);
      let name = localStorage.getItem("conversationID");
      //console.log(this.recipients);
      //if (this.recipient.length > 0) {
      let result = await axios.post(
        "http://localhost:8090/message/" + name,
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
      // } else {
      //   let result = await axios.post(
      //     "http://localhost:8090/message/create",
      //     {
      //       recipient: localStorage.getItem("recipient"),
      //       //recipient: this.recipient,
      //       content: this.content,
      //     },
      //     {
      //       headers: {
      //         authorization: localStorage.getItem("token"),
      //       },
      //     }
      //   );
      //   console.log(result);
      // }
      this.getAllConversations();
      this.getAllPostsNoParameter();
      //}
    },
    async createMessage2() {
      this.recipients[0] = "hallo";
      //this.recipients.push(this.recipient);
      console.log(this.recipients);
      if (this.recipients[0]) {
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
        // let result = await axios.post(
        //   "http://localhost:8090/message/create",
        //   {
        //     recipient: localStorage.getItem("recipient"),
        //     //recipient: this.recipient,
        //     content: this.content,
        //   },
        //   {
        //     headers: {
        //       authorization: localStorage.getItem("token"),
        //     },
        //   }
        // );
        // console.log(result);
      }
      //this.getAllConversations();
      //this.getAllPostsNoParameter();
      this.getAllConversations();
      this.getAllPostsNoParameter();
    },
    // async createMessage2() {
    //   //this.recipients.push(this.recipient);
    //   console.log(this.recipients);
    //   if (this.recipients[0]) {
    //     let result = await axios.post(
    //       "http://localhost:8090/message/create",
    //       {
    //         //recipient: this.recipient,
    //         recipients: this.recipients,
    //         content: this.content,
    //       },
    //       {
    //         headers: {
    //           authorization: localStorage.getItem("token"),
    //         },
    //       }
    //     );
    //     console.log(result);
    //   } else {
    //     // let result = await axios.post(
    //     //   "http://localhost:8090/message/create",
    //     //   {
    //     //     recipient: localStorage.getItem("recipient"),
    //     //     //recipient: this.recipient,
    //     //     content: this.content,
    //     //   },
    //     //   {
    //     //     headers: {
    //     //       authorization: localStorage.getItem("token"),
    //     //     },
    //     //   }
    //     // );
    //     // console.log(result);
    //   }
    //   //this.getAllConversations();
    //   //this.getAllPostsNoParameter();
    // },
  },
};
</script>

<style scoped lang="scss">
#editIcon {
  width: 2em;
  margin-right: -2em;
  margin-top: 1.4em;
  cursor: pointer;
}
.same {
  // display: flex;
  display: inline-block;
  font-weight: bold;
  color: #707070;
  font-family: "Arial";
}
ul {
  list-style: none;
}
.insert_message {
  position: absolute;
  width: 37.8125em;
  height: 3.75em;
  left: 6.25em;
  top: 3.375em;
  background: #f4f7ff;
  border-radius: 0.625em;
  margin-top: 42.5em;
  margin-left: 8em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255);
}
.messages_view {
  margin-bottom: 2em;
  height: 1em;
}
.conversation_segment {
  height: 5em;
  width: 23.7em;
  background: rgb(230, 246, 255);
  text-align: center;
  border-radius: 1.3125em;
  margin-top: 0.1em;
  margin-left: 0.4em;
  margin-bottom: -0.5em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255);
  border: 1px solid rgb(230, 230, 230);
  padding: 0.2em;
}
.selecteduser {
  position: absolute;
  width: 37.8125em;
  height: 3.75em;
  left: 6.25em;
  top: 3.375em;
  background: #f4f7ff;
  border-radius: 0.625em;
  margin-top: 7em;
  margin-left: 8em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255);
}
.chat {
  position: absolute;
  width: 37.8125em;
  height: 28.9em;
  left: 6.25em;
  top: 8.375em;
  background: #f4f7ff;
  border-radius: 1.1875em;
  margin-top: 6.6375em;
  margin-left: 8em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255);
  overflow: scroll;
  overflow-x: hidden;
}
.chat::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 1em;
}
.chat::-webkit-scrollbar {
  background-color: #f5f5f5;
  border-radius: 1em;
  width: 1.6em;
}
.chat::-webkit-scrollbar-thumb {
  background-color: #e1e7f7;
  border-radius: 1em;
}
// .chat::-webkit-scrollbar-button:single-button {
//   background-color: #bbbbbb;
//   display: block;
//   border-style: solid;
//   height: 13px;
//   width: 16px;
// }
// .chat::-webkit-scrollbar-button:single-button:vertical:decrement {
//   border-width: 0 8px 8px 8px;
//   border-color: transparent transparent #97a6ce transparent;
// }
// .chat::-webkit-scrollbar-button:single-button:vertical:increment {
//   border-width: 8px 8px 0 8px;
//   border-color: #97a6ce transparent transparent transparent;
// }
// .chat::-webkit-scrollbar-button:vertical:single-button:increment:hover {
//   border-color: #778dc9 transparent transparent transparent;
// }
// .chat::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
//   border-color: transparent transparent #778dc9 transparent;
// }
.conversationview {
  position: absolute;
  width: 25.125em;
  height: 34.4em;
  left: 45.1875em;
  top: 9.375em;
  background: #f4f7ff;
  border-radius: 1.3125em;
  margin-top: 6em;
  margin-left: 8em;
  border: 1px solid #f4f7ff;
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
  width: 2em;
}
.conversationview::-webkit-scrollbar-thumb {
  background-color: #e1e7f7;
  border-radius: 1em;
  // width: 2em;
}
// .conversationview::-webkit-scrollbar-button:single-button {
//   background-color: #bbbbbb;
//   display: block;
//   border-style: solid;
//   height: 13px;
//   width: 16px;
// }
// .conversationview::-webkit-scrollbar-button:single-button:vertical:decrement {
//   border-width: 0 8px 8px 8px;
//   border-color: transparent transparent #97a6ce transparent;
// }
// .conversationview::-webkit-scrollbar-button:single-button:vertical:increment {
//   border-width: 8px 8px 0 8px;
//   border-color: #97a6ce transparent transparent transparent;
// }
// .conversationview::-webkit-scrollbar-button:vertical:single-button:increment:hover {
//   border-color: #778dc9 transparent transparent transparent;
// }
// .conversationview::-webkit-scrollbar-button:single-button:vertical:decrement:hover {
//   border-color: transparent transparent #778dc9 transparent;
// }
.timeStamp {
  margin-right: 2em;
  text-align: right;
}
.recipient {
  padding-top: 10px;
  margin-left: 1.5em;
  color: rgb(255, 40, 165);
}
.directionState {
  padding-left: 23px;
  padding-block-end: 12px;
}
.postComplete {
  margin: auto;
  width: 50em;
  //border: 1px solid rgb(255, 255, 255);
  text-align: left;
  //padding: 1em;
}
.postsInside {
  background-color: #ffffff;
  text-align: left;
  margin: 0%;
  align-items: flex-start;
  width: 34em;
  height: auto;
  margin-bottom: 1em;
  margin-left: 0.5em;
  border-radius: 10px;
  box-shadow: 3.4px 2.4px 10px rgba(0, 0, 0, 0.014);
}
.postsInside2 {
  color: rgb(78, 78, 78);
  background-color: #94f07b70;
  text-align: left;
  margin: 0%;
  align-items: flex-start;
  width: 34em;
  height: auto;
  margin-bottom: 1em;
  margin-left: 0.5em;
  border-radius: 10px;
  box-shadow: 3.4px 2.4px 10px rgba(0, 0, 0, 0.014);
}
.postTitle {
  float: left;
  margin: 0%;
  margin-left: 1em;
  margin-top: 0.5em;
}
.postUsername {
  margin-top: 1em;
  margin-bottom: 1em;
  float: right;
}
.postText {
  margin: 0%;
  margin-left: 3em;
  margin-top: 5%;
  margin-right: 3em;
  word-wrap: break-word;
  word-break: break-all;
}
.input-recipient {
  position: absolute;
  margin-top: -41.5em;
  margin-left: -20em;
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
.input-username {
  float: left;
  background-color: transparent;
  border: 0px solid;
  height: 20px;
  width: 160px;
  color: rgb(93, 170, 233);
}
.input-title {
  float: left;
  margin-left: 11em;
  background-color: white;
  border: 0px solid;
  height: 20px;
  width: 160px;
  color: rgb(0, 0, 0);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
input:focus {
  outline: none;
}
.important {
  float: left;
}
.float-right {
  float: right;
}
.label-left {
  text-align: left;
  margin-right: 40em;
  padding-bottom: 10em;
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
.own_user {
  position: absolute;
  width: 25.235em;
  height: 39.4em;
  left: 45.17em;
  top: 4.375em;
  background: #f4f7ff;
  border-radius: 1.3125em;
  margin-top: 6em;
  margin-left: 8em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255);
}
/*.own_user{
  height: 3.2em;
  width: 20.7em;
  background: #f4f7ff;
  text-align: center;
  border-radius: 1.3125em;
  margin-top: 0.4em;
  margin-left: 0.4em;
  margin-bottom: -0,5em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255);
  border: 1px solid rgb(230, 230, 230);
  padding: 1.2em;
}
*/
.button-conversation {
  height: auto;
  width: 26.7em;
  // background: #f4f7ff;
  background: #faf9f9ce;
  text-align: center;
  border-radius: 1.3125em;
  margin-top: 1em;
  margin-left: 0.4em;
  margin-bottom: -0.5em;
  //box-shadow: 2px 2px 7px rgb(198, 227, 255);
  column-count: 2;
  column-gap: 20px;
  // border: 1px solid rgb(230, 230, 230);
  border: 0.325em solid rgb(218, 218, 218);
  padding: 2em;
  font-family: "Arial";
  cursor: pointer;
}
.button-conversation:hover {
  background-color: rgba(102, 194, 247, 0.25);
  color: rgb(0, 0, 0);
  box-shadow: 2px 2px 7px rgb(198, 227, 255);
  // border: 1px solid rgb(230, 230, 230);
  border: 0.325em solid rgb(218, 218, 218);
  //border-radius: 1.3125em;
}
@media (min-width: 768px) {
  .button-81 {
    font-size: 0.9rem;
    padding: 0.8rem 0.5rem;
  }
}
</style>