<template>
  <div class="index index__container">
    <div>
      <library
        v-if="library"
        :owner="library.owner"
        :headers="library.headers"
        :songs="library.songs"
      />
      <p v-else>Retrieving Library Details...</p>
      <div class="index__links">
        <a
          href="https://www.linkedin.com/in/scott-schechter/"
          target="_blank"
          class="button--green"
          >LinkedIn</a
        >
        <a
          href="https://github.com/scott-schechter"
          target="_blank"
          class="button--grey"
          >GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      library: null
    }
  },
  mounted() {
    axios
      .get('/library')
      .then(response => {
        console.log('AXIOS Response', response.data)
        this.library = response.data.library
      })
      .catch(e => {
        console.log(e)
      })
  }
}
</script>

<style lang="scss">
// ~assets/scss/pages/_index.scss
</style>
