
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
            <div class="postsInside">
              <p class="recipient">Recipient: {{ message.recipient }}</p>

              <p class="postText">{{ message.content }}</p>
              <p class="timeStamp">{{ message.time }}</p>
              <p class="directionState">{{ message.state }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="send_messages"></div>
    </div>
    <div class="insert_message">
      <div>
        <input
          type="text"
          class="input-recipient"
          placeholder="Recipient..."
          v-model="recipient"
        />
      </div>
      <div class="popup">
        <div class="popup-inner">
          <slot />

          <br />

          <div>
            <div class="message-create">
              <br />
              <br />

              <textarea
                class="textarea-content"
                name="content"
                rows="3"
                cols="55"
                placeholder="content..."
                v-model="content"
              >
              </textarea>

              <button
                style="float: right"
                class="button-81"
                v-on:click="
                  createMessage();
                  getAllConversations();
                  getAllPostsNoParameter();
                "
                role="button"
              >
                Create Post
              </button>
            </div>
          </div>
          <br />
          <br />
        </div>
      </div>
    </div>

    <div class="conversationview">
      <div
        class="postComplete"
        v-for="conversation in conversations"
        :key="conversation.user1"
      >
        <div class="conversation_segment">
          <button v-on:click="getAllPosts(conversation.user2)">
            {{ conversation.user2 }}
          </button>
          <p>{{ conversation.lastMessageSend }}</p>
        </div>

        <p></p>
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
      messages: [],
      recipient: "",
      content: "",
    };
  },
  beforeMount() {
    this.getAllConversations();
  },

  methods: {
    //Get all Messages for one conversation using the other users username as a parameter
    async getAllPosts(name) {
      localStorage.setItem("recipient", name);

      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };

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

    //get all Messages from one Conversation without having to use parameters
    async getAllPostsNoParameter() {
      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };

      let name = localStorage.getItem("recipient");
      console.log(localStorage.getItem("recipient"));
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

    //To display all the Conversations we need to get them from the Server
    async getAllConversations() {
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
    //Create a message
    async createMessage() {
      if (this.recipient.length > 3) {
        let result = await axios.post(
          "http://localhost:8090/message/create",
          {
            recipient: this.recipient,
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
  margin-left: 25em;
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
  margin-left: 25em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255);
  overflow: scroll;
  overflow-x: hidden;
}

.conversationview {
  position: absolute;
  width: 25.125em;
  height: 39.4em;
  left: 45.1875em;
  top: 4.375em;

  background: #f4f7ff;
  border-radius: 1.3125em;
  margin-top: 6em;
  margin-left: 25em;
  box-shadow: 2px 2px 7px rgb(198, 227, 255);

  overflow: scroll;
  overflow-x: hidden;
}

.timeStamp {
  margin-right: 2em;
  text-align: right;
}

.recipient {
  margin-left: 1em;
  color: rgb(255, 40, 165);
}

.postComplete {
  margin: auto;
  width: 50em;
  border: 1px solid rgb(255, 255, 255);
  text-align: left;
}
.postsInside {
  // background-color: rgb(244, 247, 255, 255);
  text-align: left;
  margin: 0%;
  align-items: flex-start;
  border: 1px solid black;
  width: 34em;
  height: 10em;
  margin-bottom: 1em;
  margin-left: 0.5em;
  border-radius: 10px;
  box-shadow: 5px 10px 8px #888888;
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
}
.textarea-content {
  margin-left: 1em;
  margin-top: -1em;
  resize: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: none;
  outline: none;
}

/* CSS */
.button-81 {
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
  padding: 1rem 1.6rem;
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
    padding: 0.5rem 2rem;
  }
}
</style>