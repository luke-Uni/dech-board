<template>
  <!-- <h1>
    <img
      src="@/assets/blue-arrow_left.png"
      alt="Blue Arrow Left"
      class="arrow"
    />
    {{ boardName }}
    <img
      src="@/assets/blue-arrow.png"
      alt="Blue Arrow Right"
      class="arrow"
      @click="nextBoard()"
    />
  </h1> -->
  <div class="sticky">
  <UserObjects/>
</div>
<!-- <div class="sticky"> -->
  <LeftSideMenu />
  
  <!-- </div> -->
  <MessageBoardSelection @changeBoard="changeBoard" />
   

  <button
    class="icon-btn add-btn"
    @click="() => TogglePopupSecond('buttonTrigger')"
  >
    <div class="add-icon"></div>
    <div class="btn-txt">Add Post</div>
  </button>

  <MessageBoardCreator
    v-if="popupTriggersSecond.buttonTrigger"
    :TogglePopupSecond="() => TogglePopup2Second('buttonTrigger')"
  />

  <div class="home">
    <div v-show="false">
      <MessageBoard />
    </div>
    <div class="" style="text-align: center; margin-top: 5%">
      <button
        class="icon-btn add-btn"
        @click="() => TogglePopup('buttonTrigger')"
      >
        <div class="add-icon"></div>
        <div class="btn-txt">Add Post</div>
      </button>
    </div>

    <CreatePost
      @Messageboard="messageboard"
      v-if="popupTriggers.buttonTrigger"
      :TogglePopup="() => TogglePopup2('buttonTrigger')"
    >
    </CreatePost>
    <AlluserList></AlluserList>
  </div>
 
</template>

<script>
// @ is an alias to /src
import { ref } from "vue";
import MessageBoard from "@/components/MessageBoard.vue";
import CreatePost from "@/components/CreatePost.vue";
import LeftSideMenu from "@/components/LeftSideMenu.vue";
import MessageBoardCreator from "@/components/MessageBoardCreator.vue";
import MessageBoardSelection from "@/components/MessageBoardSelection.vue";
import axios from "axios";
import UserObjects from "@/components/UserObjects.vue";

export default {
  setup() {
    const popupTriggersSecond = ref({
      buttonTriggerSecond: false,
    });

    const TogglePopupSecond = (trigger) => {
      popupTriggersSecond.value[trigger] = !popupTriggersSecond.value[trigger];
    };

    const TogglePopup2Second = (trigger) => {
      popupTriggersSecond.value[trigger] = !popupTriggersSecond.value[trigger];
    };

    const popupTriggers = ref({
      buttonTrigger: false,
    });

    const TogglePopup = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };

    const TogglePopup2 = (trigger) => {
      popupTriggers.value[trigger] = !popupTriggers.value[trigger];
    };

    return {
      popupTriggers,
      TogglePopup,
      TogglePopup2,
      TogglePopupSecond,
      TogglePopup2Second,
      popupTriggersSecond,
    };
    //
  },

  beforeMount() {
    this.saveBoards();
  },

  data() {
    return {
      boardName: "Dech-Board",
      messageboards: [],
    };
  },

  components: {
    MessageBoard,
    CreatePost,
    LeftSideMenu,
    MessageBoardSelection,
    MessageBoardCreator,
    UserObjects
  },
  methods: {
    saveBoards() {
      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };

      let uri = "http://localhost:8090/messageboard/get";

      let response = axios.get(uri, { headers: headers }).then((response) => {
        this.messageboards = response.data;
      });
      console.log(response);
    },

    changeBoard(title) {
      console.log(`hello world ${title}`);
      this.boardName = title;
    },
    nextBoard() {
      console.log("Go to next Board!");

      let currentBoardId = localStorage.getItem("messageboardid");
      console.log(this.messageboards.length);
      for (let index = 0; index < this.messageboards.length; index++) {
        console.log(
          this.messageboards[index].messageBoardId + "--=--" + currentBoardId
        );
        if (this.messageboards[index].messageBoardId == currentBoardId) {
          console.log("Old" + this.messageboards[index].messageBoardId);
          let newIndex = index;
          localStorage.setItem(
            "messageboardid",
            this.messageboards[newIndex + 1].messageBoardId
          );
          return;
        } else if (currentBoardId == 0) {
          console.log("Neew" + this.messageboards[index].messageBoardId);
          localStorage.setItem(
            "messageboardid",
            this.messageboards[index].messageBoardId
          );
          return;
        }
      }
    },
  },
};
</script>

<style scoped>

.sticky{
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.main-hr {
  width: 30%;
  border: none;
  border-top: 1px solid #c3c3c3;
}
.icon-btn {
  width: 50px;
  height: 50px;
  border: 1px solid #cdcdcd;
  background: white;
  border-radius: 25px;
  overflow: hidden;
  position: relative;
  transition: width 0.2s ease-in-out;
}
.add-btn:hover {
  width: 120px;
}
.add-btn::before,
.add-btn::after {
  transition: width 0.2s ease-in-out, border-radius 0.2s ease-in-out;
  content: "";
  position: absolute;
  height: 4px;
  width: 10px;
  top: calc(50% - 2px);
  background: rgb(117, 232, 255);
}
.add-btn::after {
  right: 14px;
  overflow: hidden;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.add-btn::before {
  left: 14px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.icon-btn:focus {
  outline: none;
}
.btn-txt {
  opacity: 0;
  transition: opacity 0.2s;
}
.add-btn:hover::before,
.add-btn:hover::after {
  width: 4px;
  border-radius: 2px;
}
.add-btn:hover .btn-txt {
  opacity: 1;
}
.add-icon::after,
.add-icon::before {
  transition: all 0.2s ease-in-out;
  content: "";
  position: absolute;
  height: 20px;
  width: 2px;
  top: calc(50% - 10px);
  background: rgb(117, 232, 255);
  overflow: hidden;
}
.add-icon::before {
  left: 22px;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.add-icon::after {
  right: 22px;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.add-btn:hover .add-icon::before {
  left: 15px;
  height: 4px;
  top: calc(50% - 2px);
}
.add-btn:hover .add-icon::after {
  right: 15px;
  height: 4px;
  top: calc(50% - 2px);
}

.arrow {
  width: 1em;
  margin-left: 5em;
  margin-right: 5em;
}
</style>