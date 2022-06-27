<template>
  <div>
    <div class="postComplete" v-for="post in posts" :key="post.username">
      <h4 class="postUsername">{{ post.username }}</h4>
      <div :class="[post.important ? 'importantPost' : 'postsInside']">
        <table>
          <tr>
            <th>
              <h3 :class="[post.important ? 'importantTitle' : 'postTitle']">
                {{ post.title }}
              </h3>
            </th>
          </tr>
          <tr>
            <!-- <td> -->
            <img
              src="@/assets/china.png"
              alt="ChinaLogo"
              @click="translateTextToChinese(post)"
              id="chinaLogo"
              class="countryLogo"
            />

            <br />
            <br />

            <img
              src="@/assets/germany.png"
              alt="Germany"
              @click="translateTextToGerman(post)"
              id="germanyLogo"
              class="countryLogo"
            />
            <br />
            <br />

            <img
              src="@/assets/uk.png"
              alt="Germany"
              @click="translateTextToEnglish(post)"
              id="germanyLogo"
              class="countryLogo"
            />
            <!-- </td> -->
          </tr>
          <br />
          <br />
          <tr>
            <td v-if="post.hasImage" style="width: 25em; align-content: center">
              <img id="imgPost" :src="post.image" alt="picture" />
            </td>

            <td>
              <div
                v-if="post.translationStatus == false"
                :class="[post.hasImage ? 'TextWithImage' : '']"
              >
                <p class="postText" id="hello">{{ post.content }}</p>
              </div>
              <div
                v-else-if="post.translationStatus == true"
                class="classPostDiv"
              >
                <p class="postText" id="hello">{{ post.translatedcontent }}</p>
              </div>
            </td>
          </tr>
        </table>

        <!-- Only Works 3 Times, before it shows nothing -->

        <!-- <img
            src="@/assets/uk.png"
            alt="UK"
            @click="translateTextToEnglish(post)"
            id="ukLogo"
          /> -->
      </div>
      <b> {{ post.creationDate }} </b>
      <br />
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
      postPictureTest: "",
      postcontent: "",
      kallo: "hallo ich bin rachid",
      postTranslated: false,
      test: "",
    };
  },
  beforeMount() {
    this.getAllPostsNoId();
    localStorage.setItem("conversationID", "");
  },
  methods: {
    async translateTextToGerman(text) {
      let hallo1 = "";
      let url = "http://localhost:8090/translatePost";
      let result = await axios
        .post(
          url,
          {
            text: text.content,
            source: "auto",
            target: "de",
          },
          {
            // headers: {
            //   authorization: localStorage.getItem("token"),
            //   "Content-Type": undefined,
            // },
          }
        )
        .then(function (result) {
          // console.log("-------------------------"+response.data.data);
          // console.log("-------------------------"+response.data.data.TargetText);
          //  console.log("-------------------------"+response.data.data.targeText);
          hallo1 = result.data.TargetText;
          console.log(hallo1);
          console.log(typeof hallo1);
        })
        .catch(function (error) {
          console.error(error);
        });
      for (let i = 0; i < this.posts.length; i++) {
        console.log(this.posts[i].postId + " " + text.postId);
        console.log("1 TranslationStatus: " + this.posts[i].translationStatus);
        if (this.posts[i].postId == text.postId) {
          console.log(
            "2 TranslationStatus: " + this.posts[i].translationStatus
          );
          if (this.posts[i].translationStatus == false) {
            console.log(
              "3 TranslationStatus: " + this.posts[i].translationStatus
            );
            //if(  this.posts[i].content != hallo1){
            //  this.posts[i].originalcontent =  this.posts[i].content;
            // }
            //this.posts[i].originalcontent =  this.posts[i].content;
            this.posts[i].translatedcontent = hallo1;
            this.posts[i].translationStatus = true;
          } else {
            console.log(
              " 4TranslationStatus: " + this.posts[i].translationStatus
            );
            this.posts[i].translationStatus = false;
          }
        }
      }

      console.log(result);
    },

    async translateTextToEnglish(text) {
      let hallo1 = "";
      let url = "http://localhost:8090/translatePost";
      let result = await axios
        .post(
          url,
          {
            text: text.content,
            source: "auto",
            target: "en",
          },
          {
            // headers: {
            //   authorization: localStorage.getItem("token"),
            //   "Content-Type": undefined,
            // },
          }
        )
        .then(function (result) {
          // console.log("-------------------------"+response.data.data);
          // console.log("-------------------------"+response.data.data.TargetText);
          //  console.log("-------------------------"+response.data.data.targeText);
          hallo1 = result.data.TargetText;
          console.log(hallo1);
          console.log(typeof hallo1);
        })
        .catch(function (error) {
          console.error(error);
        });
      for (let i = 0; i < this.posts.length; i++) {
        console.log(this.posts[i].postId + " " + text.postId);
        console.log("1 TranslationStatus: " + this.posts[i].translationStatus);
        if (this.posts[i].postId == text.postId) {
          console.log(
            "2 TranslationStatus: " + this.posts[i].translationStatus
          );
          if (this.posts[i].translationStatus == false) {
            console.log(
              "3 TranslationStatus: " + this.posts[i].translationStatus
            );
            //if(  this.posts[i].content != hallo1){
            //  this.posts[i].originalcontent =  this.posts[i].content;
            // }
            //this.posts[i].originalcontent =  this.posts[i].content;
            this.posts[i].translatedcontent = hallo1;
            this.posts[i].translationStatus = true;
          } else {
            console.log(
              " 4TranslationStatus: " + this.posts[i].translationStatus
            );
            this.posts[i].translationStatus = false;
          }
        }
      }

      console.log(result);
    },

    async translateTextToChinese(text) {
      let hallo1 = "";
      let url = "http://localhost:8090/translatePost";
      let result = await axios
        .post(
          url,
          {
            text: text.content,
            source: "auto",
            target: "zh",
          },
          {
            // headers: {
            //   authorization: localStorage.getItem("token"),
            //   "Content-Type": undefined,
            // },
          }
        )
        .then(function (result) {
          // console.log("-------------------------"+response.data.data);
          // console.log("-------------------------"+response.data.data.TargetText);
          //  console.log("-------------------------"+response.data.data.targeText);
          hallo1 = result.data.TargetText;
          console.log(hallo1);
          console.log(typeof hallo1);
        })
        .catch(function (error) {
          console.error(error);
        });
      for (let i = 0; i < this.posts.length; i++) {
        console.log(this.posts[i].postId + " " + text.postId);
        console.log("1 TranslationStatus: " + this.posts[i].translationStatus);
        if (this.posts[i].postId == text.postId) {
          console.log(
            "2 TranslationStatus: " + this.posts[i].translationStatus
          );
          if (this.posts[i].translationStatus == false) {
            console.log(
              "3 TranslationStatus: " + this.posts[i].translationStatus
            );
            //if(  this.posts[i].content != hallo1){
            //  this.posts[i].originalcontent =  this.posts[i].content;
            // }
            //this.posts[i].originalcontent =  this.posts[i].content;
            this.posts[i].translatedcontent = hallo1;
            this.posts[i].translationStatus = true;
          } else {
            console.log(
              " 4TranslationStatus: " + this.posts[i].translationStatus
            );
            this.posts[i].translationStatus = false;
          }
        }
      }

      console.log(result);
    },

    // //Translate Text to English
    // async translateTextToEnglish(text) {
    //   let hallo1 = "";

    //   const axios = require("axios");

    //   const encodedParams = new URLSearchParams();
    //   encodedParams.append("q", text.content);
    //   encodedParams.append("target", "en");
    //   encodedParams.append("source", "en");

    //   const options = {
    //     method: "POST",
    //     url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    //     headers: {
    //       "content-type": "application/x-www-form-urlencoded",
    //       "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    //       "X-RapidAPI-Key":
    //         // "7d1b34c23cmshf82fb063e5c4987p15f36fjsn2ae75f209a89",
    //         // "5d1d5e4d29msh38383cbe012e65dp1bc8ecjsnc81fe54408d0",
    //         //"702f1e51f7msh51a1f9495e6f4e0p10180bjsnba5626672929",
    //         //"21ec3285f4msh32c045448fe36e4p1c3201jsna2215e8d5989",
    //         //'6d5d589836mshca9bfd68f2db605p1818f9jsn5dec50884640',

    //         //1. Account
    //         //"4371de4373msh1114eee19dec596p11b9fcjsn3422372a9f08",
    //         //2. Account
    //         //'e77a4f3011mshdde71ca27045aa4p15281fjsn9290da687ebd'
    //         //'4371de4373msh1114eee19dec596p11b9fcjsn3422372a9f08'
    //         //2. Account
    //         "e77a4f3011mshdde71ca27045aa4p15281fjsn9290da687ebd",
    //       //3. Account
    //       //'9147a39e0emsh2d31c0b791076f8p1f7faejsnbbf307c7865f'
    //     },
    //     data: encodedParams,
    //   };

    //   await axios
    //     .request(options)
    //     .then(function (response) {
    //       hallo1 = response.data.data.translations[0].translatedText;
    //       console.log(hallo1);
    //       console.log(typeof hallo1);
    //     })
    //     .catch(function (error) {
    //       console.error(error);
    //     });

    //   for (let i = 0; i < this.posts.length; i++) {
    //     console.log(this.posts[i].postId + " " + text.postId);
    //     console.log("1 TranslationStatus: " + this.posts[i].translationStatus);
    //     if (this.posts[i].postId == text.postId) {
    //       console.log(
    //         "2 TranslationStatus: " + this.posts[i].translationStatus
    //       );
    //       if (this.posts[i].translationStatus == false) {
    //         console.log(
    //           "3 TranslationStatus: " + this.posts[i].translationStatus
    //         );
    //         //if(  this.posts[i].content != hallo1){
    //         //  this.posts[i].originalcontent =  this.posts[i].content;
    //         // }
    //         //this.posts[i].originalcontent =  this.posts[i].content;
    //         this.posts[i].translatedcontent = hallo1;
    //         this.posts[i].translationStatus = true;
    //       } else {
    //         console.log(
    //           " 4TranslationStatus: " + this.posts[i].translationStatus
    //         );
    //         this.posts[i].translationStatus = false;
    //       }
    //     }
    //   }
    // },

    //Translate Text into German
    // async translateTextToGerman(text) {
    //   let hallo1 = "";

    //   const axios = require("axios");

    //   const encodedParams = new URLSearchParams();
    //   encodedParams.append("q", text.content);
    //   encodedParams.append("target", "de");
    //   encodedParams.append("source", "en");

    //   const options = {
    //     method: "POST",
    //     url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    //     headers: {
    //       "content-type": "application/x-www-form-urlencoded",
    //       "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    //       "X-RapidAPI-Key":
    //         // "7d1b34c23cmshf82fb063e5c4987p15f36fjsn2ae75f209a89",
    //         // "5d1d5e4d29msh38383cbe012e65dp1bc8ecjsnc81fe54408d0",
    //         //"702f1e51f7msh51a1f9495e6f4e0p10180bjsnba5626672929",
    //         //"21ec3285f4msh32c045448fe36e4p1c3201jsna2215e8d5989",
    //         //'6d5d589836mshca9bfd68f2db605p1818f9jsn5dec50884640',

    //         //1. Account
    //         //'4371de4373msh1114eee19dec596p11b9fcjsn3422372a9f08'
    //         //2. Account
    //         "e77a4f3011mshdde71ca27045aa4p15281fjsn9290da687ebd",
    //       //3. Account
    //       //'9147a39e0emsh2d31c0b791076f8p1f7faejsnbbf307c7865f'
    //     },
    //     data: encodedParams,
    //   };

    //   await axios
    //     .request(options)
    //     .then(function (response) {
    //       hallo1 = response.data.data.translations[0].translatedText;
    //       console.log(hallo1);
    //       console.log(typeof hallo1);
    //     })
    //     .catch(function (error) {
    //       console.error(error);
    //     });

    //   for (let i = 0; i < this.posts.length; i++) {
    //     console.log(this.posts[i].postId + " " + text.postId);
    //     console.log("1 TranslationStatus: " + this.posts[i].translationStatus);
    //     if (this.posts[i].postId == text.postId) {
    //       console.log(
    //         "2 TranslationStatus: " + this.posts[i].translationStatus
    //       );
    //       if (this.posts[i].translationStatus == false) {
    //         console.log(
    //           "3 TranslationStatus: " + this.posts[i].translationStatus
    //         );
    //         // if(  this.posts[i].content != hallo1){
    //         //   this.posts[i].originalcontent =  this.posts[i].content;
    //         // }
    //         //this.posts[i].originalcontent =  this.posts[i].content;
    //         this.posts[i].translatedcontent = hallo1;
    //         this.posts[i].translationStatus = true;
    //       } else {
    //         console.log(
    //           " 4TranslationStatus: " + this.posts[i].translationStatus
    //         );
    //         this.posts[i].translationStatus = false;
    //       }
    //     }
    //   }
    // },

    //Translate into Chinese
    // async translateTextToChinese(text) {
    //   let hallo1 = "";

    //   const axios = require("axios");

    //   const encodedParams = new URLSearchParams();
    //   encodedParams.append("q", text.originalcontent);
    //   encodedParams.append("target", "zh-CN");
    //   encodedParams.append("source", "en");

    //   const options = {
    //     method: "POST",
    //     url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    //     headers: {
    //       "content-type": "application/x-www-form-urlencoded",
    //       "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    //       "X-RapidAPI-Key":
    //         // "7d1b34c23cmshf82fb063e5c4987p15f36fjsn2ae75f209a89",
    //         // "5d1d5e4d29msh38383cbe012e65dp1bc8ecjsnc81fe54408d0",
    //         //"702f1e51f7msh51a1f9495e6f4e0p10180bjsnba5626672929",
    //         //"21ec3285f4msh32c045448fe36e4p1c3201jsna2215e8d5989",
    //         //'6d5d589836mshca9bfd68f2db605p1818f9jsn5dec50884640',

    //         //1. Account
    //         //'4371de4373msh1114eee19dec596p11b9fcjsn3422372a9f08'
    //         //2. Account
    //         "e77a4f3011mshdde71ca27045aa4p15281fjsn9290da687ebd",
    //       //3. Account
    //       //'9147a39e0emsh2d31c0b791076f8p1f7faejsnbbf307c7865f'
    //     },
    //     data: encodedParams,
    //   };

    //   await axios
    //     .request(options)
    //     .then(function (response) {
    //       hallo1 = response.data.data.translations[0].translatedText;
    //       console.log(hallo1);
    //       console.log(typeof hallo1);
    //     })
    //     .catch(function (error) {
    //       console.error(error);
    //     });

    //   for (let i = 0; i < this.posts.length; i++) {
    //     console.log(this.posts[i].postId + " " + text.postId);
    //     console.log("1 TranslationStatus: " + this.posts[i].translationStatus);
    //     if (this.posts[i].postId == text.postId) {
    //       console.log(
    //         "2 TranslationStatus: " + this.posts[i].translationStatus
    //       );
    //       if (this.posts[i].translationStatus == false) {
    //         console.log(
    //           "3 TranslationStatus: " + this.posts[i].translationStatus
    //         );
    //         // if(  this.posts[i].content != hallo1){
    //         //   this.posts[i].originalcontent =  this.posts[i].content;
    //         // }
    //         //this.posts[i].originalcontent =  this.posts[i].content;
    //         this.posts[i].translatedcontent = hallo1;
    //         this.posts[i].translationStatus = true;
    //       } else {
    //         console.log(
    //           " 4TranslationStatus: " + this.posts[i].translationStatus
    //         );
    //         this.posts[i].translationStatus = false;
    //       }
    //     }
    //   }
    // },
    //To display all the Posts we need to get them from the Server
    async getAllPosts(boardId) {
      console.log("I am in the getAllPosts function");
      let id = localStorage.getItem("messageboardid");
      console.log(`Board id: ${boardId}`);
      console.log("id: " + id);
      if (`${boardId}` == undefined || `${boardId}` == null) {
        localStorage.setItem("messageboardid", "0");
      }

      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };
      let uri;
      if (boardId == undefined || boardId == null) {
        uri = "http://localhost:8090/posts/0";
      } else {
        uri = "http://localhost:8090/posts/" + boardId;
      }

      this.posts = [];

      //send asynchron Request to Server
      let response = await axios
        .get(uri, { headers: headers })
        .then((response) => {
          console.log(response);

          this.posts = response.data;

          for (var i = 0; i < this.posts.length; i++) {
            this.posts[i].translationStatus = false;
            this.posts[i].originalcontent = this.posts[i].content;
            // console.log(this.posts[i].translationStatus);
            // console.log(this.posts[i].originalcontent);
          }
        })
        //save all Posts locally
        .then((data) => (this.user = data))
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            this.$router.push("/login");
          }
          //this.errors.push(error.response && error.response.status);
        });

      this.getImages();

      console.log(response);
    },

    async getAllPostsNoId() {
      console.log("I am in the getAllPosts function");
      //let id = localStorage.getItem("messageboardid");
      //console.log(`Board id: ${boardId}`);
      // console.log("id: " + id);
      // if(`${boardId}` == undefined || `${boardId}`== null){
      localStorage.setItem("messageboardid", "0");
      //  }

      let headers = {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      };
      let uri;
      // if (boardId == undefined || boardId == null) {
      uri = "http://localhost:8090/posts/0";
      // } else {
      //  uri = "http://localhost:8090/posts/" + boardId;
      //}

      this.posts = [];

      //send asynchron Request to Server
      let response = await axios
        .get(uri, { headers: headers })
        .then((response) => {
          console.log(response);

          this.posts = response.data;

          for (var i = 0; i < this.posts.length; i++) {
            this.posts[i].translationStatus = false;
            this.posts[i].originalcontent = this.posts[i].content;
            // console.log(this.posts[i].translationStatus);
            // console.log(this.posts[i].originalcontent);
          }
        })
        //save all Posts locally
        .then((data) => (this.user = data))
        .catch(() => {});

      this.getImages();

      console.log(response);
    },

    async getImages() {
      for (var i = 0; i < this.posts.length; i++) {
        this.posts[i].translationStatus = false;
        this.posts[i].originalcontent = this.posts[i].content;
        this.posts[i].creationDate = new Date(
          this.posts[i].creationDate
        ).toDateString();
        if (this.posts[i].image != null) {
          console.log("Is not null");
          let res = await axios.get(
            "http://localhost:8090/image/" + this.posts[i].title
          );
          //console.log(res.data);
          let img = res.data;
          this.posts[i].image = "data:image/*;base64," + img;
          this.posts[i]["hasImage"] = true;
        } else {
          this.posts[i]["hasImage"] = false;
        }
        // console.log(this.posts[i].translationStatus);
        // console.log(this.posts[i].originalcontent);
      }
    },

    //Translate into Chinese
    async translateTextToChineseTencent(text) {
      let hallo1 = "";

      const axios = require("axios");

      const encodedParams = new URLSearchParams();

      encodedParams.append("Source", "en");
      encodedParams.append("Target", "zh-CN");
      encodedParams.append("ProjectID", "0");
      encodedParams.append("SourceTextList.0", text.originalcontent);

      const options = {
        method: "POST",
        url: "https://tmt.tencentcloudapi.com/?Action=TextTranslateBatch",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
          "X-RapidAPI-Key":
            // "7d1b34c23cmshf82fb063e5c4987p15f36fjsn2ae75f209a89",
            // "5d1d5e4d29msh38383cbe012e65dp1bc8ecjsnc81fe54408d0",
            //"702f1e51f7msh51a1f9495e6f4e0p10180bjsnba5626672929",
            //"21ec3285f4msh32c045448fe36e4p1c3201jsna2215e8d5989",
            //'6d5d589836mshca9bfd68f2db605p1818f9jsn5dec50884640',

            //1. Account
            //'4371de4373msh1114eee19dec596p11b9fcjsn3422372a9f08'
            //2. Account
            "e77a4f3011mshdde71ca27045aa4p15281fjsn9290da687ebd",
          //3. Account
          //'9147a39e0emsh2d31c0b791076f8p1f7faejsnbbf307c7865f'
        },
        data: encodedParams,
      };

      await axios
        .request(options)
        .then(function (response) {
          hallo1 = response.data.data.translations[0].translatedText;
          console.log(hallo1);
          console.log(typeof hallo1);
        })
        .catch(function (error) {
          console.error(error);
        });

      for (let i = 0; i < this.posts.length; i++) {
        console.log(this.posts[i].postId + " " + text.postId);
        console.log("1 TranslationStatus: " + this.posts[i].translationStatus);
        if (this.posts[i].postId == text.postId) {
          console.log(
            "2 TranslationStatus: " + this.posts[i].translationStatus
          );
          if (this.posts[i].translationStatus == false) {
            console.log(
              "3 TranslationStatus: " + this.posts[i].translationStatus
            );
            // if(  this.posts[i].content != hallo1){
            //   this.posts[i].originalcontent =  this.posts[i].content;
            // }
            //this.posts[i].originalcontent =  this.posts[i].content;
            this.posts[i].translatedcontent = hallo1;
            this.posts[i].translationStatus = true;
          } else {
            console.log(
              " 4TranslationStatus: " + this.posts[i].translationStatus
            );
            this.posts[i].translationStatus = false;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
#chinaLogo {
  width: 2em;
  /* float: right; */
  margin-left: 47em;
  margin-top: -2em;

  position: absolute;
  cursor: pointer;
  /* box-shadow: 1px 1px 1px #888888; */

  border: 1.6px solid gray;
}

#germanyLogo {
  width: 2em;
  margin-top: -2em;

  margin-left: 47em;

  position: absolute;
  cursor: pointer;
  border: 1.6px solid gray;
}

#ukLogo {
  width: 2em;

  margin-bottom: -2em;
  /* float: right; */
  margin-left: 47em;
  position: absolute;
  cursor: pointer;
  border: 1.6px solid gray;
}

.postComplete {
  margin: auto;
  width: 50em;
  border: 1px;
  text-align: left;
}
.postsInside {
  background-color: rgb(244, 247, 255, 255);
  text-align: left;
  margin: 0%;
  align-items: flex-start;
  border: 1px solid black;

  height: 20em;
  margin-bottom: 2%;
  border-radius: 10px;
  box-shadow: 5px 10px 8px #888888;
}
.importantPost {
  background-color: rgb(244, 247, 255, 255);
  text-align: left;
  margin: 0%;
  align-items: flex-start;
  border: 1px solid rgb(220, 46, 46);
  /* width: 100%; */
  height: 20em;
  margin-bottom: 2%;
  border-radius: 10px;
  box-shadow: 5px 10px 18px red;
}

.postTitle {
  float: left;
  margin: 0em;
  margin-left: 1em;
  margin-top: 0.5em;
}

.importantTitle {
  float: left;
  margin: 0%;
  margin-left: 1em;
  margin-top: 0.5em;
  color: red;
}
.postUsername {
  margin-top: 1em;
  margin-bottom: 1em;
}
.TextWithImage {
  margin-top: -2em;
  width: 25em;
  height: 10em;
  background-color: #e9f3fd;
  border-radius: 10%;
  padding: 1em;
}

#imgPost {
  display: block;
  margin-left: auto;
  margin-right: auto;
  border-radius: 15%;
  margin-top: -3em;
  border: solid rgb(255, 255, 255);
  max-height: 13em;
  max-width: 20em;
}

.countryLogo {
  margin-left: 2em;
}
</style>