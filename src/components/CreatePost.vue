<template>
  <br />
  <div class="popup">
    <div class="popup-inner">
      <button
        type="button"
        class="btn-close popup-close"
        @click="TogglePopup()"
      >
        <span class="icon-cross"></span>
        <span class="visually-hidden"></span>
      </button>

      <!-- <button class="popup-close" @click="TogglePopup()">Close Popup</button> -->

      <div>
        <div class="message-create">
          <!-- <input
            type="text"
            class="input-username"
            placeholder="Username"
            v-model="username"
          />  -->

          <div
            @dragenter.prevent="toggleActive"
            @dragleave.prevent="toggleActive"
            @dragover.prevent
            @drop.prevent="toggleActive"
            :class="{ 'active-dropzone': active }"
            class="dropzone"
          >
            <span v-show="!this.imgIsUploaded">Drag and Drop File</span>
            <span v-show="!this.imgIsUploaded">OR</span>
            <label for="dropzoneFile" v-show="!this.imgIsUploaded"
              >Select File</label
            >
            <input
              v-show="!this.imgIsUploaded"
              type="file"
              ref="uploadImage"
              accept="image/*"
              id="dropzoneFile"
              class="dropzoneFile"
              @change="onImageUpload()"
            />
            <img
              src="@/assets/blue-tick.png"
              alt="blue tick"
              id="blue-tick"
              v-show="this.imgIsUploaded"
            />
          </div>

          <input
            type="text"
            class="input-title"
            placeholder="Title..."
            v-model="title"
            maxlength="25"
          />
          <br />
          <br />

          <textarea
            class="textarea-content"
            name="content"
            rows="10"
            cols="55"
            placeholder="content..."
            v-model="content"
            maxlength="700"
          >
          </textarea>
        </div>
      </div>
      <br />
      <br />
      <table class="table-left">
        <tr>
          <br />
          <td>
            <input
              type="checkbox"
              name="Important"
              v-model="important"
              value="Important"
              class="switch_1"
            />
            <br />
            <label for="important">Important</label>
          </td>

          <td class="td-left">
            <button
              class="button-81"
              v-on:click="
              badWordsFilterAPIAxios(this.content);
                createPost();
                TogglePopup();
                getAllPosts();
              "
              role="button"
            >
              Create Post
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";

// import MessageBoard from "./MessageBoard.vue";

export default {
  name: "CreatePost",

  components: {},

  props: ["TogglePopup"],

  data() {
    return {
      //  username: "",
      title: "",
      content: "",
      important: "",
      imgPost: null,
      messageBoardId: "",
      imgIsUploaded: false,
      // posts:[]
    };
  },
   setup() {
    const { cookies } = useCookies();
    return{
      cookies
    };},

  methods: {
    // async getAllPosts(){
    //    MessageBoard.getAllPosts();
    // },
    // async badWordsFilterAPI() {
    //   var myHeaders = new Headers();
    //   myHeaders.append("apikey", "eUHPlznMstdcjKPfpY5QdtZYrDN042b5");
  
    //   var raw = "Son of a Bitch I love you";

    //   var requestOptions = {
    //     method: "POST",
    //     redirect: "follow",
    //     headers: myHeaders,
    //     body: raw,
        
    //   };

    //   fetch(
    //     "https://api.apilayer.com/bad_words?censor_character={censor_character}",
    //     requestOptions
    //   )
    //     .then((response) => response.text())
    //     .then((result) => console.log(result)
    //     )
    //     .catch((error) => console.log("error", error));
        
    // },
    async badWordsFilterAPIAxios(text) {
      var hallo1 = "";
      var myHeaders = new Headers();
      myHeaders.append("apikey", "eUHPlznMstdcjKPfpY5QdtZYrDN042b5");
  
      var raw = text;

      var requestOptions = {
        method: "POST",
        redirect: "follow",
        //headers: myHeaders,
        body: raw,
        
      };
      let result = await axios
        .post(
          "https://api.apilayer.com/bad_words?censor_character={censor_character}",
          {
            requestOptions
          },
          {
             headers: {
            "apikey": "eUHPlznMstdcjKPfpY5QdtZYrDN042b5"
             },
          
    })
        .then(function (result) {
          // console.log("-------------------------"+response.data.data);
          // console.log("-------------------------"+response.data.data.TargetText);
          //  console.log("-------------------------"+response.data.data.targeText);
          hallo1 = result.data.censored_content.requestOptions;
          console.log(result.data);
          console.log( hallo1);
        })
        .catch(function (error) {
          console.error(error);
        });
    console.log(result);
        

    //  let response = await fetch(
    //     "https://api.apilayer.com/bad_words?censor_character={censor_character}",
    //     requestOptions
    //   )
    //     .then((response) => response.text())
    //     .then((result) => console.log(result.censored_content)
    //     )
    //     .catch((error) => console.log("error", error));
    //     console.log(response.censored_content);
        
    },

    onImageUpload() {
      let file = this.$refs.uploadImage.files[0];
      console.log(file.size);

      this.imgPost = new FormData();
      this.imgPost.append("image", file);

      this.imgIsUploaded = true;
    },

    startupload(postTitle) {
      axios({
        url: "http://localhost:8090/posts/image",
        method: "Post",
        data: this.imgPost,
        headers: {
          authorization: this.cookies.get("token"),
          //post Title should be changed to postId
          postId: postTitle,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      }).then((response) => {
        console.log(JSON.stringify(response.data));
      });
    },

    async createPost() {
      let url = "";
      if (this.cookies.get("messageboardid") != null) {
        this.messageBoardId = this.cookies.get("messageboardid");
        url =
          "http://localhost:8090/posts/create/" +
          this.cookies.get("messageboardid");
      } else {
        this.messageBoardId = 0;
        url = "http://localhost:8090/posts/create";
      }

      let result = await axios.post(
        //"https://dech-board-rest-server.herokuapp.com/posts/create",
        url,

        {
          //username: this.username,
          title: this.title,
          content: this.content,
          important: this.important,
          // messageBoardId: this.messageBoardId,
        },
        {
          headers: {
            authorization: this.cookies.get("token"),
            "Content-Type": undefined,
          },
        }
      );

      console.log(result);

      this.startupload(this.title);
    },
  },
};
</script>

<style scoped lang="scss" >
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.popup-inner {
  background: white;
  padding: 32px;
  border-radius: 10px;
}
.table-left {
  margin: auto;
}
.td-left {
  padding-left: 35em;
}
.message-create {
  display: block;
  white-space: pre;
}
.input-username {
  float: left;
  background-color: transparent;
  border: 0px solid;
  height: 20px;
  width: 160px;
  color: rgb(93, 170, 233);
}
.input-title {
  float: left;
  margin-left: 11em;
  background-color: white;
  border: 0px solid;
  height: 20px;
  width: 160px;
  color: rgb(0, 0, 0);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
input:focus {
  outline: none;
}
.important {
  float: left;
}
.float-right {
  float: right;
}
.label-left {
  text-align: left;
  margin-right: 40em;
  padding-bottom: 10em;
}
.message-create {
  width: 60em;
  height: 15em;
  padding: 1em;
  margin: auto;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  background-color: rgba(244, 247, 255, 255);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.textarea-content {
  resize: none;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  border: none;
  outline: none;
}
/* CSS */
.button-81 {
  background-color: rgba(244, 247, 255, 255);
  border: 0 solid #e2e8f0;
  border-radius: 1.5rem;
  box-sizing: border-box;
  color: #0d222a;
  cursor: pointer;
  display: inline-block;
  font-family: "Basier circle", -apple-system, system-ui, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1;
  padding: 1rem 1.6rem;
  text-align: center;
  text-decoration: none rgba(244, 247, 255, 255) solid;
  text-decoration-thickness: auto;
  transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0px 1px 2px rgba(118, 162, 255, 0.25);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.button-81:hover {
  background-color: rgba(102, 194, 247, 0.25);
  color: rgb(0, 0, 0);
}
@media (min-width: 768px) {
  .button-81 {
    font-size: 1.125rem;
    padding: 1rem 2rem;
  }
}
input[type="checkbox"].switch_1 {
  font-size: 20px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 3.5em;
  height: 1.5em;
  background: #ddd;
  border-radius: 3em;
  position: relative;
  cursor: pointer;
  outline: none;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
input[type="checkbox"].switch_1:checked {
  background: rgb(253, 78, 78);
}
input[type="checkbox"].switch_1:after {
  position: absolute;
  content: "";
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  background: #fff;
  -webkit-box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.3);
  -webkit-transform: scale(0.7);
  transform: scale(0.7);
  left: 0;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
}
input[type="checkbox"].switch_1:checked:after {
  left: calc(100% - 1.5em);
}
@mixin cross($size: 20px, $color: currentColor, $thickness: 1px) {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  position: relative;
  width: $size;
  height: $size;
  &:before,
  &:after {
    content: "";
    position: absolute;
    top: ($size - $thickness) / 2;
    left: 0;
    right: 0;
    height: $thickness;
    background: $color;
    border-radius: $thickness;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
  span {
    display: block;
  }
}
// Example 1.
.btn-close {
  margin: 0;
  border: 0;
  padding: 0;
  background: rgb(255, 150, 150);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 150ms;
  float: right;
  .icon-cross {
    @include cross(20px, #fff, 6px);
  }
  &:hover,
  &:focus {
    transform: rotateZ(90deg);
    background: rgb(253, 78, 78);
  }
}

//Dropzone css
.dropzone {
  margin: 1em;
  float: left;
  margin-right: 0em;
  width: 15em;
  height: 10em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  border: 2px dashed #56d8ff;
  background-color: #fff;
  transition: 0.3s ease all;
  label {
    padding: 8px 12px;
    color: #fff;
    background-color: #56d8ff;
    transition: 0.3s ease all;
  }
  input {
    display: none;
  }
}
.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: #56d8ff;
  label {
    background-color: #fff;
    color: #56d8ff;
  }
}

#blue-tick {
  max-width: 5em;
}
</style>