<template>
  <div id="app">
    <div class="postion"></div>
    <section class="dropdown-wrapper">
      <div
        @click="getAllUsers(), (isVisible = !isVisible)"
        class="selected-User"
      >
        <!-- <span v-if="selectedUser">{{selectedUser.username}}</span>
        <span v-else>Search User</span> -->
        <span v-if="!selectedUser[0]">Select User</span>
        <span v-else>{{ selectedUser[0].username }} </span>

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

export default {
  components: {
    // UserUser
  },
  data() {
    return {
      searchQuery: "",
      // selectedUser: 'none',
      selectedUser: [],
      isVisible: false,
      search: "",
      users: [],
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
    getAllUsers() {
      //console.logs("workung (UserList funct.)");
      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };

      let uri = "http://localhost:8090/getUsers";

      let response = axios.get(uri, { headers: headers }).then((response) => {
        this.users = response.data;
      });
      console.log(response);
    },
  },
};
</script>
<style scoped lang="scss">
.dropdown-wrapper {
  max-width: 350px;
  position: relative;
  margin: 0 auto;
  margin-top: -10em;
  margin-left: 80em;
  .selected-User {
    height: 40px;
    border: 2px solid lightgray;
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    font-weight: 400;

    .drop-down-icon {
      transform: rotate(0deg);
      transition: all.4s ease;
      &.dropdown {
        transform: rotate(180deg);
      }
    }
  }
  .dropdown-popover {
    position: absolute;
    border: 2px solid lightgray;
    top: 46px;
    left: 0;
    right: 0;
    background-color: #fff;
    max-width: 100%;
    padding: 10px;
    visibility: hidden;
    transition: all 0.5s linear;
    max-height: 0px;
    overflow: hidden;

    &.visible {
      max-height: 450px;
      visibility: visible;
    }

    input {
      width: 90%;
      height: 30px;
      border: 2px solid lightgrey;
      font-size: 16px;
      padding-left: 8px;
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