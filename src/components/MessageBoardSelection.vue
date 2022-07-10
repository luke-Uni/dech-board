<template>
  <div class="app2">
    <h1>
      <img
        src="@/assets/blue-arrow_left.png"
        alt="Blue Arrow Left"
        class="arrow"
        @click="previousBoard()"
      />
      {{ boardName }}
      <img
        src="@/assets/blue-arrow.png"
        alt="Blue Arrow Right"
        class="arrow"
        @click="nextBoard()"
      />
    </h1>
    
    <section class="dropdown-wrapper">
      <div
        @click="getAllUsers(), (isVisible = !isVisible)"
        class="selected-User"
      >
        <span v-if="!selectedUser[0]"> Select Message-Board</span>
        <!-- shows the choosen User -->
        <span v-else>{{ selectedUser[0].username }} </span>
        <!-- just the visual element for the dropdown menu -->
        <svg
          :class="isVisible ? 'dropdown' : ''"
          class="drop-down-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 10.828l-4.95 4.95-1.414-1.414L12 8l6.364 6.364-1.414 1.414z"
          />
        </svg>
      </div>

      <div
        :class="isVisible ? 'visible' : 'invisible'"
        class="dropdown-popover"
      >
       
        <span v-if="filteredUser.length == 0">No Data Available</span>
        <div class="options">
          <ul>
            <li @click="changeBoardMain()">
              Dech-Board
            </li>
            <li
              @click="changeBoard(messageboard)"
              v-for="messageboard in messageboards"
              :key="messageboard.MessageBoardId"
            >
              {{ messageboard.messageBoardName }}
            </li>
          </ul>
        </div>
      </div>
    </section>
    <MessageBoard ref="messageBoard" />
  </div>
</template>

<script>
// import UserUser from "./UserUser.vue";
import axios from "axios";
import MessageBoard from "@/components/MessageBoard.vue";
import { useCookies } from "vue3-cookies";

export default {
  components: {
    MessageBoard,
  },
  beforeMount() {
    this.saveBoards();
  },
  data() {
    return {
      searchQuery: "",
      selectedUser: [],
      isVisible: false,
      search: "",
      users: [],
      categories: "",
      german: "",
      chinese: "",
      boardName: "Dech-Board",
      messageboards: [],
      array2: [],
    };
  },
  computed: {
    filteredUser() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery == "") {
        return this.users;
      }
      return this.users.filter((user) => {
        return Object.values(user).some((word) =>
          String(word).toLowerCase().includes(query)
        );
      });
    },
  },
  setup() {
    const { cookies } = useCookies();
    return{
      cookies
    };},
  methods: {
    changeBoard(board) {
      console.log("Board name: " + board.messageBoardName);
      this.boardName = board.messageBoardName;
      this.cookies.set("messageboardid", board.messageBoardId, 0);
      this.$refs.messageBoard.getAllPosts(board.messageBoardId);
    },
    changeBoardMain(){
        let messageBoardId= "0";
        let messageBoardName= "Dech-Board";
      this.boardName = messageBoardName;
      this.cookies.set("messageboardid", messageBoardId, 0);
      this.$refs.messageBoard.getAllPosts(messageBoardId);
    },
    async getAllUsers() {
      let headers = {
        "Content-Type": "application/json",
        authorization: this.cookies.get("token"),
      };

      let uri = "http://localhost:8090/messageboard/get";
      let response = axios.get(uri, { headers: headers }).then((response) => {
        this.users = response.data;
        this.messageboards = response.data;
      });
      console.log(response);
    },
    saveBoards() {
      let headers = {
        "Content-Type": "application/json",
        authorization: this.cookies.get("token"),
      };

      let uri = "http://localhost:8090/messageboard/get";

      let response = axios
        .get(uri, { headers: headers })
        .then((response) => {
          this.messageboards = response.data;
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.$router.push("/login");
          }
        });
      console.log(response);
    },
    nextBoard() {
      console.log("Go to next Board!");

      let currentBoardId = this.cookies.get("messageboardid");
      console.log(this.messageboards.length);
      for (let index = 0; index < this.messageboards.length; index++) {
        console.log(
          this.messageboards[index].messageBoardId + "--=--" + currentBoardId
        );
        if (index == this.messageboards.length - 1) {
         this.cookies.set("messageboardid", "0", 0);
          let hallo = this.messageboards[0];
          hallo.messageBoardId = "0";
          hallo.messageBoardName = "Dech-Board";
          hallo.participants = [];
          hallo.admin = "";
          this.changeBoard(hallo);
          return;
        } else if (this.messageboards[index].messageBoardId == currentBoardId) {
          console.log("Old" + this.messageboards[index].messageBoardId);
          let newIndex = index;
          if (index + 1 == this.array2.length) {
            this.cookies.set("messageboardid", "0",0);
            let hallo = this.messageboards[0];
            hallo.messageBoardId = "0";
            hallo.messageBoardName = "Dech-Board";
            hallo.participants = [];
            hallo.admin = "";
            this.changeBoard(hallo);
            return;
          } else {
            //Error
            this.cookies.set(
              "messageboardid",
              this.messageboards[newIndex + 1].messageBoardId, 0
            );
          }

          this.changeBoard(this.messageboards[newIndex + 1]);
          return;
        } else if (currentBoardId == 0) {
          console.log("++++++++++++++++++++++++++");
          console.log("Neew" + this.messageboards[index].messageBoardId);
          this.cookies.set(
            "messageboardid",
            this.messageboards[index].messageBoardId, 0
          );
          this.changeBoard(this.messageboards[index]);
          return;
        }
      }
    },

    previousBoard() {
      console.log("Go to previous Board!");
      this.array2 = structuredClone(this.messageboards);
      console.log(this.array2);
      this.array2.reverse();
      console.log(this.array2);

      let currentBoardId = this.cookies.get("messageboardid");
      for (let index = 0; index < this.array2.length; index++) {
        console.log(
          this.array2[index].messageBoardId + "--=--" + currentBoardId
        );
        if (this.array2[index].messageBoardId == currentBoardId) {
          console.log("Old" + this.array2[index].messageBoardId);
          if (index + 1 == this.array2.length) {
            this.cookies.set("messageboardid", "0", 0);
            let hallo = this.messageboards[0];
            hallo.messageBoardId = "0";
            hallo.messageBoardName = "Dech-Board";
            hallo.participants = [];
            hallo.admin = "";

            this.changeBoard(hallo);
            return;
          } else {
            this.cookies.set(
              "messageboardid",
              this.array2[index + 1].messageBoardId, 0
            );
          }
          this.changeBoard(this.array2[index + 1]);
          return;
        } else if (currentBoardId == 0) {
          console.log("++++++++++++++++++++++++++");
          console.log("Neew" + this.array2[index].messageBoardId);
          this.cookies.set(
            "messageboardid",
            this.array2[index].messageBoardId, 0
          );
          this.changeBoard(this.array2[index]);
          return;
        }
      }
    },
  },
};
</script>
<style scoped lang="scss">
.app2 {
  
  left: 12em;
  right: 0%;
  top: 0%;
}
.dropdown-wrapper {
  position: fixed;
  top: 1.5em;
  margin-left: 15em;
  width: 15em;
  .selected-User {
    height: 40px;
    border: 2px solid rgba(102, 194, 247, 0.25);
    background-color: rgba(102, 194, 247, 0.25);
    border-radius: 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 400;
    box-shadow: 5px 5px 10px rgba(109, 109, 109, 0.555);

    .drop-down-icon {
      cursor: pointer;
      font-size: 16px;
      transform: rotate(0deg);
      transition: all.4s ease;
      &.dropdown {
        transform: rotate(180deg);
      }
    }
  }
  .dropdown-popover {
    position: absolute;
    border: 2px solid rgba(102, 194, 247, 0.25);
    border-radius: 5px;
    top: 46px;
    left: 0;
    right: 0;
    background-color: rgb(236, 248, 255);
    max-width: 100%;
    padding: 10px;
    visibility: hidden;
    transition: all 0.5s linear;
    max-height: 0px;
    overflow: hidden;
    box-shadow: 5px 5px 10px rgba(109, 109, 109, 0.555);

    &.visible {
      max-height: 450px;
      visibility: visible;
    }

    input {
      width: 90%;
      height: 30px;
      border: 2px solid rgba(102, 194, 247, 0.25);
      border-radius: 5px;
      font-size: 16px;
      padding-left: 8px;
    }

    .friendsCheckbox {
      font-weight: bold;
    }
    .friendsCheckbox2 {
      width: 1em;
      height: 2em;
    }
    ul::-webkit-scrollbar {
  background-color: #f5f5f5;
  border-radius: 1em;
  width: 1em;
}
ul::-webkit-scrollbar-thumb {
  background-color: rgb(165, 220, 252);
  border-radius: 1em;
}

    .options {
      width: 100%;

      ul {
        list-style: none;
        text-align: left;
        padding-left: 8px;
        max-height: 180px;
        overflow-y: scroll;
        overflow-x: hidden;
        ul::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 1em;
}


        li {
          border-radius: 0.5em;
          border-bottom-left-radius:0.3em;
          border-top-left-radius:0.3em;
          width: 75%;
          border-bottom: 1px solid rgba(102, 194, 247, 0.25);
          padding: 10%;
          background-color: rgb(208, 238, 255);
          cursor: pointer;
          font-size: 16px;
          &:hover {
            background: rgb(208, 238, 255);
            color: rgb(138, 198, 255);
            font-weight: bold;
          }
        }
      }
    }
  }
}
.arrow {
  width: 1em;
  margin-left: 5em;
  margin-right: 5em;
}

.arrow:hover {
  cursor: pointer;
}
</style>