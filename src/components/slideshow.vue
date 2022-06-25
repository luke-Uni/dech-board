<template>
  <div class="Eingabe">
    <input @click="profanityFilter()" type="text" />
  </div>
</template>

<script>
export default {
  methods: {
    profanityFilter() {
      var myHeaders = new Headers();
      myHeaders.append("apikey", "KcNb5GoWlgH2VqW8NdRFIzo8nQXAOV4V");

      var raw = "{body}";

      var requestOptions = {
        method: "POST",
        redirect: "follow",
        headers: myHeaders,
        body: raw,
      };

      fetch(
        "https://api.apilayer.com/bad_words?censor_character={censor_character}",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    },
  },
};
</script>

<style>
</style>