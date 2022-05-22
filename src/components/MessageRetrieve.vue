<template>
  <!-- <LeftSideMenu /> -->
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
</template>

<script>
import axios from "axios";
// import LeftSideMenu from "@/components/LeftSideMenu.vue";
export default {
  components: {
    // LeftSideMenu,
  },
  data() {
    return {
      messages: [],
    };
  },
  beforeMount() {
    this.getAllPosts();
  },
  methods: {
    //To display all the Posts we need to get them from the Server
    getAllPosts() {
      //console.log("I am in the getAllPosts function");

      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };
      //console.log(localStorage.getItem("currentuser"));
      // let uri = "http://localhost:8090/message/getall";
      var name = localStorage.getItem("recipient");
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
  },
};
</script>

<style scoped>
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
  background-color: rgb(244, 247, 255, 255);
  text-align: left;
  margin: 0%;
  align-items: flex-start;
  border: 1px solid black;
  width: 34em;
  height: 28em;
  margin-bottom: 2%;
  margin-left: 0.5em;
  border-radius: 10px;
  box-shadow: 5px 10px 8px #888888;
}
.importantPost {
  background-color: rgb(244, 247, 255, 255);
  text-align: left;
  margin: 0%;
  align-items: flex-start;
  border: 1px solid rgb(220, 46, 46);
  width: 100%;
  height: 10em;
  margin-bottom: 2%;
  border-radius: 10px;
  box-shadow: 5px 10px 18px red;
}

.postTitle {
  float: left;
  margin: 0%;
  margin-left: 1em;
  margin-top: 0.5em;
}

.importantTitle {
  float: left;
  margin: 0%;
  margin-left: 1em;
  margin-top: 0.5em;
  color: red;
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
</style>