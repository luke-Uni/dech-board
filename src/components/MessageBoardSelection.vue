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
    <div class="postion"></div>
    <section class="dropdown-wrapper">
      <div
        @click="getAllUsers(), (isVisible = !isVisible)"
        class="selected-User"
      >
        <!-- <span v-if="selectedUser">{{selectedUser.username}}</span>
        <span v-else>Search User</span> -->
        <span v-if="!selectedUser[0]">Select Message-Board</span>
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
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for MessageBoard"
        />
        <span v-if="filteredUser.length == 0">No Data Available</span>
        <div class="options">
          <ul>
            <!-- <li
              @click="selectUser(user)"
              v-for="(user, index) in filteredUser"
              :key="`user-${index}`"
            >
              {{ user.username }}
            </li> -->
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
    // UserUser
  },
  beforeMount() {
    this.saveBoards();
  },
  data() {
    return {
      searchQuery: "",
      // selectedUser: 'none',
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
      this.$refs.messageBoard.getAllPosts(board.messageBoardId);
    },

    // messageBoardIdTransmit(board){
    //   this.$emit("messageboardid", board.messageBoardId);
    // },
    async getAllUsers() {
      //console.logs("workung (UserList funct.)");
      let headers = {
        "Content-Type": "application/json",
        authorization: this.cookies.get("token"),
      };

      let uri = "http://localhost:8090/messageboard/get";
      // if (this.categories){
      //   uri="http://localhost:8090/friendsobject"
      // }
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
      //this.array2 = [].concat(this.messageboards).reverse();
      console.log(this.array2);
      //dto = this.messageboards;
      this.array2.reverse();
      console.log(this.array2);

      let currentBoardId = this.cookies.get("messageboardid");
      //console.log(this.array2.length);
      for (let index = 0; index < this.array2.length; index++) {
        console.log(
          this.array2[index].messageBoardId + "--=--" + currentBoardId
        );
        if (this.array2[index].messageBoardId == currentBoardId) {
          console.log("Old" + this.array2[index].messageBoardId);
          //let newIndex = index;
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
  position: absolute;
  left: 10em;
  right: 0%;
  top: 0%;
}
.dropdown-wrapper {
  position: absolute;
  top: 28em;
  right: -3.5em;
  width: 15em;
  .selected-User {
    height: 40px;
    border: 2px solid black;
    background-color: lightgrey;
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
    border: 2px solid black;
    border-radius: 5px;
    top: 46px;
    left: 0;
    right: 0;
    background-color: lightgrey;
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
      border: 2px solid black;
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

    .options {
      width: 100%;

      ul {
        list-style: none;
        text-align: left;
        padding-left: 8px;
        max-height: 180px;
        overflow-y: scroll;
        overflow-x: hidden;

        li {
          width: 100%;
          border-bottom: 1px solid lightgray;
          padding: 10%;
          background-color: #f1f1f1;
          cursor: pointer;
          font-size: 16px;
          &:hover {
            background: #70878a;
            color: #fff;
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