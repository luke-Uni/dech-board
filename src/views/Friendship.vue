<template>
  <LeftSideMenu />
  <div class="left">
    <input type="text" v-model="searchQuery" />
    <button @click="getAllUsers()" class="getUserButton">Search</button>
    <ul>
      <span v-if="filteredUser.length == 0">No Data Available</span>
      <!-- 渲染好友列表 -->
      <li
        class="person"
        v-for="(user, index) in filteredUser"
        :key="`user-${index}`"
      >
        <div class="avatar">
          <!-- <img :src="person.src" :alt="person.des" /> -->
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
          <button id="add" @click="addFriend(user.username)">add</button>
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
          <th colspan="3">friendList</th>
        </tr>
        <tr id="example">
          <th>User</th>
          <th>Mail</th>
          <th>Manage</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in gridData" :key="item">
          <td>{{ item.username1 }}</td>
          <td>{{ item.school }}</td>
          <td class="mange">
            <!-- <button class="send-message" @click="addFriend(item)">Add</button> -->
            <button class="delete" @click="deleteFriend(item)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import LeftSideMenu from "@/components/LeftSideMenu.vue";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Friendship",
  data() {
    return {
      searchQuery: "",
      gridColumns: ["name", "school"],
      gridData: [],
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
  methods: {
    // 搜索好友
    getAllUsers() {
      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };
      let uri = "http://localhost:8090/getUsers";
      let response = axios.get(uri, { headers: headers }).then((response) => {
        this.personArr = response.data;
      });
      console.log(response);
    },
    // 添加好友
    addFriend(friend) {
      let friendName = friend;

      let headers = {
        authorization: localStorage.getItem("token"),
      };

      let uri = "http://localhost:8090/friendship/request";

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
        authorization: localStorage.getItem("token"),
      };

      let uri = "http://localhost:8090/friends";

      let response = axios.get(uri, { headers: headers }).then((response) => {
        this.gridData = response.data;
        for (let i = 0; i < this.gridData.length; i++) {
          if (
            this.gridData[i].username1 == localStorage.getItem("currentuser")
          ) {
            this.gridData[i].username1 = response.data[i].username2;
          }
        }
        console.log(response.data);
      });
      console.log(response.data);
    },

    deleteFriend(userFriend) {
      let friendName = userFriend.username1;

      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };

      if (userFriend.username1 == localStorage.getItem("currentuser")) {
        friendName = userFriend.username2;
      }

      let uri = "http://localhost:8090/friends/" + friendName;

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

.addButton {
  width: 10em;
  margin-left: 4em;
  float: right;
  /*display: flex;*/
}

#add {
  margin-right: 3em;
  background-color: #778dc9;
  border-radius: 3em;
  display: inline-block;
  width: 7em;
  height: 2em;
}

#add:hover {
  cursor: pointer;
}

.person {
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  /*border-left: 3px solid #ccc;*/
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
}

.right {
  margin-top: 3em;
  border-radius: 10px;
  width: 30%;
  height: 500px;
  /*background-color: #6dfaff;*/
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
  float: right;
}
</style>