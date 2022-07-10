<template>
  <div class="app">
    <section class="dropdown-wrapper">
      <div
        @click="getAllUsers(), (isVisible = !isVisible)"
        class="selected-User"
      >
        <!-- <span v-if="selectedUser">{{selectedUser.username}}</span>
        <span v-else>Search User</span> -->
        <span v-if="!selectedUser[0]">Select User</span>
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
        <div class="friendsCheckbox" id="checkboxes">
          <table>
            <tr>
              <td>
                <label>contacts only</label>
              </td>
              <td>
                <input
                  type="radio"
                  name="filterOptions"
                  value="contacts"
                  v-model="this.categories"
                  @click="getFriends()"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Fra Uas Students</label>
              </td>
              <td>
                <input
                  type="radio"
                  name="filterOptions"
                  value="contacts"
                  v-model="this.german"
                  @click="getFriendsAndGerman()"
                />
              </td>
              <td>
                <label>Henan Students</label>
              </td>
              <td>
                <input
                  type="radio"
                  name="filterOptions"
                  value="contacts"
                  v-model="this.chinese"
                  @click="getChineseUsers()"
                />
              </td>
            </tr>
          </table>
        </div>

        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for User"
        />
        <span v-if="filteredUser.length == 0">No Data Available</span>
        <div class="options">
          <ul>
            <li
              @click="selectUser(user)"
              v-for="(user, index) in filteredUser"
              :key="`user-${index}`"
            >
              {{ user.username }}
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import UserUser from "./UserUser.vue";
import axios from "axios";
import { useCookies } from "vue3-cookies";

export default {
  components: {
    // UserUser
  },
  setup() {
    const { cookies } = useCookies();
    return {
      cookies,
    };
  },
  data() {
    return {
      searchQuery: "",
      // selectedUser: 'none',
      selectedUser: [],
      isVisible: false,
      search: "",
      users: [],
      secondUsers: [],
      categories: "",
      german: "",
      chinese: "",
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
  methods: {
    selectUser(user) {
      this.selectedUser[0] = user;
      this.isVisible = false;
    },
    async getAllUsers() {
      //console.logs("workung (UserList funct.)");
      let headers = {
        "Content-Type": "application/json",
        authorization: this.cookies.get("token"),
      };

      let uri = "http://localhost:8090/getUsers";
      // if (this.categories){
      //   uri="http://localhost:8090/friendsobject"
      // }
      let response = axios.get(uri, { headers: headers }).then((response) => {
        this.users = response.data;
      });
      console.log(response);
    },
    // filter fuction to get only friends
    async getFriends() {
      //console.logs("workung (UserList funct.)");
      let headers = {
        "Content-Type": "application/json",
        authorization: this.cookies.get("token"),
      };
      let uri = "http://localhost:8090/friendsobject";
      if (this.categories) {
        uri = "http://localhost:8090/getUsers";
      }
      let response = axios.get(uri, { headers: headers }).then((response) => {
        this.users = response.data;
      });
      console.log(response);
    },
    async getGermanUsers() {
      // if (this.chinese) {
      //   this.getAllUsers();
      //   return;
      // }
      //console.logs("workung (UserList funct.)");
      let headers = {
        "Content-Type": "application/json",
        authorization: this.cookies.get("token"),
      };
      let uri = "http://localhost:8090/getGermanUsers";
      if (this.german) {
        uri = "http://localhost:8090/getUsers";
      }
      let response = axios.get(uri, { headers: headers }).then((response) => {
        this.secondUsers = response.data;
        this.users = response.data;
      });
      console.log(response);
    },
    async getChineseUsers() {
      // if (this.german) {
      //   this.getAllUsers();
      //   return;
      // }
      //console.logs("workung (UserList funct.)");
      let headers = {
        "Content-Type": "application/json",
        authorization: this.cookies.get("token"),
      };
      let uri = "http://localhost:8090/getChineseUsers";
      if (this.chinese) {
        uri = "http://localhost:8090/getUsers";
      }
      let response = axios.get(uri, { headers: headers }).then((response) => {
        this.users = response.data;
      });
      console.log(response);
    },
    async getFriendsAndGerman() {
      if (this.categories) {
        console.log("-------------------------huhuuhbhbjh");
        this.getGermanUsers();
        this.getFriends();

        console.log(this.users);
        console.log(this.secondUsers);

        this.users = this.users.filter(function (n) {
          return this.secondUsers.indexOf(n) !== -1;
        });

        return;
      }
      console.log("-------------------------");
      this.getGermanUsers();
    },
  },
};
</script>
<style scoped lang="scss">
.app {
  width: 100%;
  height: 100%;
  top: 0%;
}
.dropdown-wrapper {
  position: fixed;
  top: 1.5em;
  right: 8em;
  width: 17em;
  height: 20em;
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
    background-color: rgba(148, 211, 248, 0.25);
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
    .Checkbox2 {
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
          width: 100%;
          border-bottom: 1px solid rgba(102, 194, 247, 0.25);
          padding: 10%;
          background-color: rgba(208, 238, 255, 0.822);
          cursor: pointer;
          font-size: 16px;
          &:hover {
            background: rgba(208, 238, 255, 0.822);
            color: rgb(138, 198, 255);
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>