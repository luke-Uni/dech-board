<template>
  
 <div>
    <input
            type="text"
            class="input-recipient"
            placeholder="Recipient..."
            v-model="recipient"
          /> 
 </div>
  <div class="popup">


    <div class="popup-inner">
      <slot />
       
      <!-- <button
        type="button"
        class="btn-close popup-close"
        @click="TogglePopup()"
      >
        <span class="icon-cross"></span>
        <span class="visually-hidden"></span>
      </button> -->
      <br />
     

      <!-- <button class="popup-close" @click="TogglePopup()">Close Popup</button> -->

      <div>
        <div class="message-create">
          <!--  -->
          <!-- <br />
          <br /> -->
          <!-- <button v-on:click="getUserList()">GetUser</button> -->
          
         
         
          
          <br />
          <br />
          
          <textarea
            class="textarea-content"
            name="content"
            rows="3"
            cols="55"
            placeholder="content..."
            v-model="content"
          >
          
          </textarea>

          <button style="float:right"
              class="button-81"
              v-on:click="
                createMessage()
                // TogglePopup();
              "
              role="button"
            >
              Create Post
            </button>
        </div>
      </div>
      <br />
      <br />
      <!-- <table class="table-left">
        <tr>
          <br />
          <td> -->
             <!-- <input
              type="checkbox"
              name="Important"
              v-model="important"
              value="Important"
              class="switch_1"
            /> -->
            <!-- <br /> -->
            <!-- <label for="important">Important</label> -->
          <!-- </td>

          <td class="td-left"> -->
            <!-- <button
              class="button-81"
              v-on:click="
                createMessage()
                // TogglePopup();
              "
              role="button"
            >
              Create Post
            </button> -->
          <!-- </td>
        </tr>
      </table> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MessageCreation",


  //   props: ["TogglePopup"],

  data() {
    return {
      //username: "",
      recipient: "",
      content: "",
      users: [],
    };
  },

  methods: {
    async createMessage() {
      let result = await axios.post(
        //"https://dech-board-rest-server.herokuapp.com/posts/create",
        "http://localhost:8090/message/create",
        {
          // username: this.username,
          recipient: this.recipient,
          content: this.content,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
     localStorage.setItem("recipient", this.recipient);
      console.log(result);
    },
//     async getUserList(){

//  let headers = {
//         "Content-Type": "application/json",
//         authorization: localStorage.getItem("token"),
//       };

//       let response = await axios.get(
//         "http://localhost:8090/user/getall",
//       { headers: headers }

//       ).then((response) => {
//             this.users=response.data;
//       }).then((data) => (this.user = data))
//         .catch((e) => {
//           this.errors.push(e);
//         });

//         console.log(response);


//     }
  },
};
</script>

<style scoped lang="scss" >
// .popup {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   z-index: 99;
//   background-color: rgba(0, 0, 0, 0.2);
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

.input-recipient{
  position: absolute;
  margin-top:-41.5em;
  margin-left:-20em ;
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
  width: 38em;

  padding: 0em;
  // margin: auto;
  margin-left: -2em;
  margin-top: -3em;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  border-radius: 10px;
  background-color: rgba(244, 247, 255, 255);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
}
.textarea-content {
  margin-left: 1em;
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
    font-size: 0.9rem;
    padding: 0.5rem 2rem;
  }
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
</style>