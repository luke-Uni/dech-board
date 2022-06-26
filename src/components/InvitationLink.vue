<template>
  <div class="invitation">
    <table>
      <tr>
        <td>
          <p class="linkText">{{ inviteLink }}</p>
        </td>
        <td>
          <div>
            <img
              src="@/assets/save.png"
              alt="saveButton"
              id="saveIcon"
              @click="copyToClipboard()"
            />
          </div>
        </td>
      </tr>
    </table>

    <button type="button" class="button-81" @click="showLink()">
      Invitation Link
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return { inviteLink: "Invite Link", tooltipText: "" };
  },

  methods: {
    showLink() {
      this.inviteLink =
        "https://6295d65cef6ded1aa8f66ec0--dechboard.netlify.app/#/registeruser";
      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };

      let uri = "http://localhost:8090/posts/getall";
      //send synchron Request to Server
      let response = axios.get(uri, { headers: headers });

      console.log(response.status);
    },

    showHoverText() {
      this.tooltip = "Copy Me";
      console.log("MouseOverEvent");
    },

    copyToClipboard() {
      var copyText = this.inviteLink;

      /* Select the text field */
      //copyText.select();
      //copyText.setSelectionRange(0, 99999); /* For mobile devices */

      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText);

      this.tooltipText = "Copied to Clipboard";

      /* Alert the copied text */
      alert("Copied the Link to clipboard.");
    },
  },
};
</script>

<style scoped>
.invitation {
  position: absolute;
  
  bottom: 1em;
  left: 12em;

  width:  37.8125em;
  


}

table {
  align-content: center;
  margin-left: auto;
  margin-right: auto;
}
#saveIcon {
  width: 1em;
  margin-left: 1em;
}

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

.bookmark.icon {
  color: #000;
  position: absolute;
  margin-left: 33.5em;
  margin-top: 0.1em;
  width: 0.6em;
  height: 15px;
  border-radius: 1px 1px 0 0;
  border-top: solid 1px currentColor;
  border-left: solid 1px currentColor;
  border-right: solid 1px currentColor;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 140px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  bottom: 150%;
  left: 50%;
  margin-left: -75px;
  opacity: 0;
  transition: opacity 0.3s;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
  top: 10px;
  left: 1px;
  width: 7px;
  height: 7px;
  border-top: solid 1px currentColor;
  border-left: solid 1px currentColor;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>