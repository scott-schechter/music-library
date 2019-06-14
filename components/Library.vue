<template>
  <section class="library">
    <div class="library__container">
      <h2 class="library__title">{{ owner }}'s Library</h2>
      <table class="library__table">
        <thead>
          <tr>
            <th
              v-for="(colName, index) in headers"
              :key="index"
              :class="
                selectedIndex === index
                  ? 'library__th--selected'
                  : 'library__th'
              "
              @click="sort(index, colName)"
            >
              {{ colName }} {{ getSortArrow(index) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(song, index) in orderedSongs"
            :key="index"
            class="library__song-row"
          >
            <td>{{ song.title }}</td>
            <td>{{ song.artist }}</td>
            <td>{{ song.album_name }}</td>
            <td>{{ getSongLengthDisplay(song.length_in_seconds) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="library__search-container">
        <span>
          <input v-model="inputVal" type="text" name="searchText" />
          <input
            type="button"
            name="searchButton"
            value="Search"
            @click="search($event)"
          />
          <input
            type="button"
            name="searchButton"
            value="Reset"
            @click="reset($event)"
          />
        </span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    owner: {
      type: String,
      required: true
    },
    headers: {
      type: Array,
      required: true
    },
    songs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedIndex: -1,
      ascending: true,
      orderedSongs: [],
      inputVal: ''
    }
  },
  mounted() {
    this.orderedSongs = this.songs.slice(0)
  },
  methods: {
    getSortArrow(colIndex) {
      if (this.selectedIndex === colIndex && this.ascending) {
        return '^'
      } else if (this.selectedIndex === colIndex && !this.ascending) {
        return 'v'
      } else {
        return ''
      }
    },
    getSongLengthDisplay(seconds) {
      const min = Math.floor(seconds / 60)
      const sec = seconds % 60
      return `${min}m ${sec}s`
    },
    reset() {
      this.orderedSongs = this.songs
      this.ascending = true
      this.selectedIndex = -1
      this.inputVal = ''
    },
    search($event, colIndex) {
      if (!this.songs || this.songs.Length === 0) {
        return []
      }
      // Partial reset of data variables
      this.orderedSongs = this.songs
      this.ascending = true
      this.selectedIndex = -1

      // Find matches on any field
      this.orderedSongs = this.orderedSongs.filter(elm => {
        const val = this.inputVal.toLowerCase()
        if (elm.title.toLowerCase().includes(val)) {
          return elm
        } else if (elm.artist.toLowerCase().includes(val)) {
          return elm
        } else if (elm.album_name.toLowerCase().includes(val)) {
          return elm
        } else if (
          this.getSongLengthDisplay(elm.length_in_seconds).includes(
            this.inputVal
          )
        ) {
          return elm
        }
      })

      return this.orderedSongs
    },
    sort(colIndex, colName) {
      // Handle the display direction of the arrow on the sorted column
      let direction = this.selectedIndex === colIndex ? -1 : 1
      if (!this.ascending) {
        direction = direction * -1
      }
      this.ascending = direction === 1
      this.selectedIndex = colIndex

      // Perform a sort by column
      this.orderedSongs = this.songs.slice(0).sort((a, b) => {
        if (colName === 'Artist') {
          return direction * a.artist.localeCompare(b.artist)
        } else if (colName === 'Title') {
          return direction * a.title.localeCompare(b.title)
        } else if (colName === 'Album Name') {
          return direction * a.album_name.localeCompare(b.album_name)
        } else if (colName === 'Length') {
          return (
            direction * (a.length_in_seconds >= b.length_in_seconds ? 1 : -1)
          )
        }
      })
      return this.orderedSongs
    }
  }
}
</script>

<style lang="scss">
// ~assets/scss/components/_library.scss
</style>
