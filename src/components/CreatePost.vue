<template>
  <br />
  <div class="popup">
    <div class="popup-inner">
      <slot />
      <button class="popup-close" @click="TogglePopup()">Close Popup</button>
      <div>
        <div class="message-create">
          <input
            type="text"
            class="input-username"
            placeholder="Username"
            v-model="username"
          />

          <input
            type="text"
            class="input-title"
            placeholder="Title..."
            v-model="title"
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
                createPost();
                TogglePopup();
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

export default {
  name: "CreatePost",

  props: ["TogglePopup"],

  data() {
    return {
      username: "",
      title: "",
      content: "",
      important: "",
    };
  },

  methods: {
    async createPost() {
      let result = await axios.post(
        "http://localhost:8090/posts/create",
        {
          username: this.username,
          title: this.title,
          content: this.content,
          important: this.important,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(result);
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
  margin-left: -1em;
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
  width: 50em;

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
  background: rgb(255, 100, 100);
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
</style>