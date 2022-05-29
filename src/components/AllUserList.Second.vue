<template>

    <div class="see Users">
   
        <UserObject/>

      <button
        type="userList"
        class=""
        @click="userList()"
      >
        <span class="icon-cross"></span>
        <span class="visually-hidden"></span>
      </button>
    </div>

</template>




<script>

 //just testing(copy of the component createPost)
import axios from "axios";

import UserObject from "./UserObject.vue";


export default {

    name: 'AllUserList',
    data() {
        return {
        //  username: "",
        //  title: "",
        //  content: "",
        //  important: "",
        };
    },
    methods: {
        async getUsers() {
            let result = await axios.post(
            //"https://dech-board-rest-server.herokuapp.com/posts/create",
            "http://localhost:8090/posts/getUsers", {
                //username: this.username,
                users: this.getUsers,
                //title: this.title,
                // content: this.content,
                // important: this.important,
            }, {
            //headers: {
            //  authorization: localStorage.getItem("token"),
            // },
            });
            console.log(result);
        },
    },
    components: { UserObject }
};
</script>