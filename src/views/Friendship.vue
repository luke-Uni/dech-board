<template>
  <LeftSideMenu />
  <div class="left">
    <input type="text" v-model="searchQuery" />
    <button @click="getAllUsers()" class="getUserButton">Search</button>
    <ul>
      <span v-if="filteredUser.length == 0">No Data Available</span>
      <li
        class="person"
        v-for="(user, index) in filteredUser"
        :key="`user-${index}`"
      >
        <div class="avatar">
          <img
            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4005587090,2408158268&fm=26&gp=0.jpg"
            :alt="Picture"
          />
        </div>
        <div class="content">
          <div class="name">{{ user.username }}</div>
          <div class="des">{{ user.email }}</div>
        </div>
        <div class="addButton">
          <button
            v-if="user.isFriend"
            id="delete"
            @click="deleteFriend(user.username)"
          >
            Remove
          </button>
          <button
            v-else-if="!user.isFriend && !user.requested"
            id="add"
            @click="addFriend(user.username)"
          >
            Add
          </button>
          <button
            v-else-if="!user.isFriend && user.requested"
            id="accept"
            @click="addFriend(user.username)"
          >
            Accept
          </button>
        </div>
      </li>
    </ul>
  </div>
  <div class="right">
    <img
      id="refresh"
      src="@/assets/Refresh.png"
      alt="Resfresh Button"
      @click="getFriendList()"
    />
    <table>
      <thead>
        <tr>
          <th colspan="3">Contact List</th>
        </tr>
        <tr id="example">
          <th>User</th>
          <th>Country</th>
          <th>Manage</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in gridData" :key="item">
          <td>{{ item.username }}</td>
          <td>{{ item.country }}</td>
          <td class="mange">
            <button class="delete" @click="deleteFriend(item.username)">
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import LeftSideMenu from "@/components/LeftSideMenu.vue";
import axios from "axios";
import { useCookies } from "vue3-cookies";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Friendship",
  data() {
    return {
      searchQuery: "",
      gridColumns: ["name", "school"],
      gridData: [],
      requests: [],
      personArr: [
        {
          name: "王港",
          src: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4005587090,2408158268&fm=26&gp=0.jpg",
          des: "颈椎不好",
          sex: "m",
          id: "056482",
        },
      ],
    };
  },
  beforeMount() {
    this.getAllUsers();
  },
  components: {
    LeftSideMenu,
  },
  setup() {
    const { cookies } = useCookies();
    return {
      cookies,
    };
  },
  methods: {
    // 搜索好友
    async getAllUsers() {
      let headers = {
        "Content-Type": "application/json",
        authorization: this.cookies.get("token"),
      };
      let uri = "http://localhost:8090/getUsers";
      let response = await axios
        .get(uri, { headers: headers })
        .then((response) => {
          this.personArr = response.data;
        });

      let headers2 = {
        "Content-Type": "application/json",
        authorization: this.cookies.get("token"),
      };

      let uri2 = "http://localhost:8090/friendsobject";

      let response2 = await axios
        .get(uri2, { headers: headers2 })
        .then((response2) => {
          this.gridData = response2.data;
          console.log(response2.data);
        });

      for (let i = 0; i < this.personArr.length; i++) {
        this.personArr[i]["isFriend"] = false;
        for (let j = 0; j < this.gridData.length; j++) {
          if (this.personArr[i].username == this.gridData[j].username) {
            this.personArr[i]["isFriend"] = true;
            console.log("Yessir");
            console.log(this.personArr[i].isFriend);
          }
        }
      }

      let headers3 = {
        "Content-Type": "application/json",
        authorization: this.cookies.get("token"),
      };

      let uri3 = "http://localhost:8090/requests";

      let response3 = await axios
        .get(uri3, { headers: headers3 })
        .then((response3) => {
          this.requests = response3.data;
          console.log(response3.data);
        });

      for (let i = 0; i < this.requests.length; i++) {
        this.personArr[i]["requested"] = false;
        for (let j = 0; j < this.personArr.length; j++) {
          console.log(
            this.personArr[j].username + " --=-- " + this.requests[i].from
          );
          if (this.personArr[j].username == this.requests[i].from) {
            console.log(this.personArr[j].requested + " requested");
            this.personArr[j]["requested"] = true;
          }
        }
      }

      console.log(response);
      console.log(response2);
      console.log(response3);
    },
    // adding a friend
    addFriend(friend) {
      let friendName = friend;

      let headers = {
        authorization: this.cookies.get("token"),
      };

      let uri = "http://localhost:8090/contact/request";

      console.log(friendName);

      let response = axios
        .post(uri, friendName, { headers: headers })
        .then((response) => {
          console.log(response.data);
        });

      console.log(response.data);
    },

    getFriendList() {
      let headers = {
        "Content-Type": "application/json",
        authorization: this.cookies.get("token"),
      };

      let uri = "http://localhost:8090/friendsobject";

      let response = axios.get(uri, { headers: headers }).then((response) => {
        this.gridData = response.data;
        console.log(response.data);
      });
      console.log(response.data);
    },

    deleteFriend(userFriend) {
      let friendName = userFriend;

      let headers = {
        "Content-Type": "application/json",
        authorization: this.cookies.get("token"),
      };

      if (userFriend.username1 == this.cookies.get("token")) {
        friendName = userFriend.username2;
      }

      let uri = "http://localhost:8090/contact/" + friendName;

      let response = axios
        .delete(uri, { headers: headers })
        .then((response) => {
          console.log(response.data);
        });

      console.log(response.data);
    },
  },
  computed: {
    filteredUser() {
      const query = this.searchQuery.toLowerCase();
      if (this.searchQuery == "") {
        return this.personArr;
      }
      return this.personArr.filter((user) => {
        return Object.values(user).some((word) =>
          String(word).toLowerCase().includes(query)
        );
      });
    },
  },
};
</script>

<style scoped>
#refresh {
  width: 2em;
  color: #6dfaff;
}

#refresh:hover {
  -webkit-animation: spin 2s linear infinite;
  -moz-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  cursor: pointer;
}
@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.addButton {
  width: 10em;
  margin-left: 4em;
  float: right;
}

#add {
  margin-right: 3em;
  background-color: rgb(93, 93, 191);
  border-radius: 3em;
  display: inline-block;
  width: 7em;
  height: 2em;
  border: 0em;
}

#add:hover {
  cursor: pointer;
}

#delete {
  margin-right: 3em;
  background-color: rgb(185, 76, 76);
  border-radius: 3em;
  display: inline-block;
  width: 7em;
  height: 2em;
  border: 0em;
}

#delete:hover {
  cursor: pointer;
}
#accept {
  margin-right: 3em;
  background-color: rgb(73, 153, 73);
  border-radius: 3em;
  display: inline-block;
  width: 7em;
  height: 2em;
  border: 0em;
}

#accept:hover {
  cursor: pointer;
}
.person {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
}

.avatar {
  margin-right: 10px;
  vertical-align: middle;
}

.avatar img {
  width: 4em;
  height: 4em;
  border-radius: 100%;
  margin-right: 2em;
}

.content {
  display: flex;
  flex-direction: column;
  width: 15em;
}

.content .des {
  align-self: center;
  color: #aaa;
  font-size: 10px;
  margin-top: 1em;
  width: 15em;
}

input {
  margin-top: 2em;
  width: 50%;
  margin-right: 5%;
  border-radius: 5px;
  height: 2em;
  font-size: 1em;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}

.getUserButton {
  height: 3em;
  background-color: coral;
  border-radius: 5em;
  width: 7em;
}

.getUserButton:hover {
  cursor: pointer;
}

.left {
  margin-top: 3em;
  border-radius: 1em;
  background-color: #f4f7ff;
  width: 35em;
  height: 40em;
  float: left;
  margin-left: 20em;
  margin-right: 5em;
  overflow: scroll;
  overflow-x: hidden;
}

.left::-webkit-scrollbar-track {
  background-color: #f5f5f5;
  border-radius: 1em;
}

.left::-webkit-scrollbar {
  background-color: #f5f5f5;
  border-radius: 1em;
  width: 1.6em;
}

.left::-webkit-scrollbar-thumb {
  background-color: #e1e7f7;
  border-radius: 1em;
}

.right {
  margin-top: 3em;
  border-radius: 10px;
  width: 30%;
  height: 500px;
  float: left;
}

table {
  border: 2px solid #42b983;
  border-radius: 3px;
  background-color: #fff;
}

th {
  background-color: #42b983;
  color: rgba(255, 255, 255, 0.66);
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

td {
  background-color: #f9f9f9;
}

th,
td {
  width: 10%;
  padding: 10px 20px;
}

.send-message {
  border-radius: 8px;
  background-color: #6dfaff;
  float: left;
}

.delete {
  border-radius: 8px;
  background-color: red;
}

.delete:hover {
  cursor: pointer;
}
</style>