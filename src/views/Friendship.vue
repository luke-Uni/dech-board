<template>
  <LeftSideMenu />
  <div class="left">
    <input type="text" v-model="search" />
    <button @click="getAllUsers()" class="getUserButton">search</button>
    <ul>
      <!-- 渲染好友列表 -->
      <li class="person" v-for="person in personArr" :key="person.id">
        <div class="avatar">
          <img :src="person.src" :alt="person.des" />
        </div>
        <div class="content">
          <div class="name">{{ person.name }}</div>
          <div class="des">{{ person.des }}</div>
        </div>
        <div class="addButton">
          <button id="add" onclick="addFriend(this.id)">add</button>
        </div>
      </li>
    </ul>
  </div>
  <div class="right">
    <button @click="getFriendList()">Upadte Friends</button>
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
            <button class="send-message" @click="addFriend(item)">Add</button>
            <button class="delete">Remove</button>
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
  components: {
    LeftSideMenu,
  },
  methods: {
    // 搜索好友
    getAllUsers() {
      // let headers = {
      //   "Content-Type": "application/json",
      //   authorization: localStorage.getItem("token"),
      // };
      // let uri = "http://localhost:8090/getUsers";
      // let response = axios.get(uri, { headers: headers }).then((response) => {
      //   this.gridData += response.data;
      // });
      // console.log(response);
    },
    // 添加好友
    addFriend(userFriend) {
      let friendName = userFriend.username1;

      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };

      let uri = "http://localhost:8090/friendship/request";

      if (userFriend.username1 == localStorage.getItem("currentuser")) {
        friendName = userFriend.username2;
      }

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
        console.log(response.data);
      });
      console.log(response.data);
    },
  },
  computed: {
    // 获取好友列表
  },
};
</script>

<style scoped>
.addButton {
  width: 70%;
  /*display: flex;*/
}

#add {
  margin-left: 60%;
  background-color: #778dc9;
  border-radius: 8px;
  display: inline-block;
  width: 30%;
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
  width: 50px;
  height: 50px;
  border-radius: 100%;
}

.content {
  display: flex;
  flex-direction: column;
}

.content .des {
  color: #aaa;
  font-size: 10px;
  margin-top: 5px;
}

input {
  margin-top: 2em;
  width: 50%;
  margin-right: 5%;
  border-radius: 5px;
  height: 2em;
}

.getUserButton {
  height: 2em;
  background-color: coral;
  width: 20%;
}

.left {
  margin-top: 3em;
  border-radius: 10px;
  background-color: #f4f7ff;
  width: 30%;
  height: 500px;
  float: left;
  margin-left: 24%;
  margin-right: 5%;
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