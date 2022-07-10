<template>

    <div class="seeUsers">
   
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
        };
    },
    methods: {
        async getUsers() {
            let result = await axios.post(
            "http://localhost:8090/posts/getUsers", {
                users: this.getUsers,
            }, {
            });
            console.log(result);
        },
    },
    components: { UserObject }
};
</script>