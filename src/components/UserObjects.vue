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
                  class="Checkbox2"
                  type="checkbox"
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
                  class="Checkbox2"
                  type="checkbox"
                  v-model="this.german"
                  @click="getFriendsAndGerman()"
                />
              </td>
              <td>
                <label>Henan Students</label>
              </td>
              <td>
                <input
                  class="Checkbox2"
                  type="checkbox"
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
    return{
      cookies
    };},
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
      if (this.chinese) {
        this.getAllUsers();
        return;
      }
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
      if (this.german) {
        this.getAllUsers();
        return;
      }
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
  position: absolute;
  left: 10em;
  width: 100%;
  height: 100%;
  top: 0%;
}
.dropdown-wrapper {
  position: absolute;
  top: 5em;
  right: 1em;
  width: 20em;
  height: 20em;

  .selected-User {
    position: absolute;
    width: 250px;
    height: 50px;
    border: 2px solid black;
    border-radius: 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    box-shadow: 5px;
    background-color: lightgrey;
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
    top: 4px;
    left: 0;
    right: 0;
    border-radius: 5px;
    background-color: lightgrey;
    max-width: 100%;

    visibility: hidden;
    transition: all 0.3s linear;
    box-shadow: 5px 5px 10px rgba(109, 109, 109, 0.555);

    overflow: hidden;

    width: 20em;

    &.visible {
      position: absolute;
      top: 5em;
      max-height: 450px;
      visibility: visible;
      background-color: lightgrey;
    }

    input {
      width: 90%;
      height: 30px;
      border: 2px solid lightgrey;
      font-size: 16px;
      padding-left: 8px;
      border-radius: 5px;
      border: 2px solid black;
    }

    .friendsCheckbox {
      font-weight: bold;
    }
    .Checkbox2 {
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
</style>