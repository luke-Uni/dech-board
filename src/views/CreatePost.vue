<template>
  <br />
  <div class="pp">
    <table class="centering">
      <tr>
        <td><input type="text" placeholder="Username" v-model="username" /></td>
      </tr>
      <tr>
        <td><input type="text" placeholder="Title" v-model="title" /></td>
      </tr>
      <tr>
        <td>
          <textarea
            name="content"
            rows="4"
            cols="50"
            placeholder="content"
            v-model="content"
          >
          </textarea>
        </td>
      </tr>
      <tr>
        <td>
          <!--Dropzone for the file the user wants to upload-->
          <DropZone @drop.prevent="drop" @change="selectedFile" />
          <span class="file-info">File: {{ dropzoneFile.name }}</span>
        </td>
      </tr>
      <tr>
        <td>
          <p>
            Important
            <input type="checkbox" name="Important" v-model="important" />
          </p>
        </td>
      </tr>
    </table>
  </div>

  <br />

  <button v-on:click="createPost()">Create Post</button>
</template>

<script>
import DropZone from "../components/DropZone.vue";
import { ref } from "vue";
import axios from "axios";

export default {
  name: "CreatePost",
  components: {
    DropZone,
  },
  setup() {
    let dropzoneFile = ref("");
    const drop = (e) => {
      dropzoneFile.value = e.dataTransfer.files[0];
    };
    const selectedFile = () => {
      dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
    };
    return { dropzoneFile, drop, selectedFile };
  },
  data() {
    return {
      username: "",
      title: "",
      content: "",
      important: ""
      //,
      //file: "",
    };
  },
  //
  methods: {
    async createPost() {
      //   let headers = {
      //    "Content-Type": "application/json",
      //   token: this.token,
      // };
      let result = await axios.post(
        "http://localhost:8090/posts/create",
        {
          username: this.username,
          title: this.title,
          content: this.content,
          important: this.important,
         // file: this.dropzoneFile


        }
   
        // {
        //   headers: headers,
        // }
      );
       console.log(this.dropzoneFile);
      console.log(result);
    },
  },
};
</script>

<style>
input {
  background-color: transparent;
  border: 0px solid;
  height: 20px;
  width: 160px;
  color: rgb(93, 170, 233);
}
input:focus {
  outline: none;
}

.pp {
  margin: auto;
  width: 50%;
  border: 3px solid rgb(93, 170, 233);
  padding: 10px;
}
</style>