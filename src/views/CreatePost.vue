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
            rows="6"
            cols="60"
            placeholder="content"
            v-model="content"
          >
          </textarea>
        </td>
      </tr>
      <!-- <tr>
        <td>
         Dropzone for the file the user wants to upload
           <DropZone @drop.prevent="drop" @change="selectedFile" />
           <span class="file-info">File: {{ dropzoneFile.name }}</span>
        </td>
      </tr> -->
      <tr>
        <td></td>
      </tr>
    </table>
  </div>
  <div  class="float-left" style="margin: auto; width: 41em">
    <div class="important">
  <p >
    Important
    <input
     
      type="checkbox"
      name="Important"
      v-model="important"
    />
  </p>
  </div>
  <br />

  <!-- HTML !-->
  <button v-on:click="createPost()" class="button-82-pushable float-right" role="button">
    <span class="button-82-shadow"></span>
    <span class="button-82-edge"></span>
    <span class="button-82-front text"> Create Post </span>
  </button>
  </div>
</template>

<script>
// import DropZone from "../components/DropZone.vue";
// import { ref } from "vue";
import axios from "axios";

export default {
  name: "CreatePost",
  // components: {
  //    DropZone,
  //   },
  //   setup() {
  //   let dropzoneFile = ref("");
  //   const drop = (e) => {
  //       dropzoneFile.value = e.dataTransfer.files[0];
  //    };
  //     const selectedFile = () => {
  //      dropzoneFile.value = document.querySelector(".dropzoneFile").files[0];
  //     };
  //    return { dropzoneFile, drop, selectedFile };
  //   },
  data() {
    return {
      username: "",
      title: "",
      content: "",
      important: "",
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

          //
        }

        // {
        //   headers: headers,
        // }
      );
      /// console.log(this.dropzoneFile);
      console.log(result);
    },
  },
};
</script>

<style scoped >
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

.important{
  float: left;
}

.float-left {
 
  margin-right: 25%;
}

.float-right{
  float: right;
}

.pp {
  width: 40em;

  padding: 10px;
  margin: auto;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  background-color: rgb(227, 238, 248);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
textarea {
  resize: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: none;
  outline: none;
  
}

/* CSS */
.button-82-pushable {
  position: relative;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  transition: filter 250ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-82-shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  will-change: transform;
  transform: translateY(2px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

.button-82-edge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: linear-gradient(
    to left,
    rgb(0, 120, 189) 0%,
    rgb(0, 117, 163) 8%,
    rgb(0, 84, 163) 92%,
    rgb(0, 120, 189) 0%
  );
}

.button-82-front {
  display: block;
  position: relative;
  padding: 12px 27px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: white;
  background: rgb(0, 172, 240);
  will-change: transform;
  transform: translateY(-4px);
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
}

@media (min-width: 768px) {
  .button-82-front {
    font-size: 1.25rem;
    padding: 12px 42px;
  }
}

.button-82-pushable:hover {
  filter: brightness(110%);
  -webkit-filter: brightness(110%);
}

.button-82-pushable:hover .button-82-front {
  transform: translateY(-6px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.button-82-pushable:active .button-82-front {
  transform: translateY(-2px);
  transition: transform 34ms;
}

.button-82-pushable:hover .button-82-shadow {
  transform: translateY(4px);
  transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
}

.button-82-pushable:active .button-82-shadow {
  transform: translateY(1px);
  transition: transform 34ms;
}

.button-82-pushable:focus:not(:focus-visible) {
  outline: none;
}
</style>