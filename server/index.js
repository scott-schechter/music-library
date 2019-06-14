const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Return a hard coded user library object
// TODO Database CRUD operations
app.get('/library', (req, res) => {
  const library = {
    headers: ['Title', 'Artist', 'Album Name', 'Length'],
    owner: 'Scott Schechter',
    songs: [
      {
        title: 'Some Kind of Thing',
        artist: 'That Guy',
        album_name: 'Its Forgettable',
        length_in_seconds: 356
      },
      {
        title: 'Another Generic One',
        artist: 'The Catepillars',
        album_name: 'The Cyan Album',
        length_in_seconds: 199
      },
      {
        title: 'Smash Hit 2',
        artist: 'Another Band',
        album_name: 'Famous One - The Sequel',
        length_in_seconds: 444
      },
      {
        title: 'Elevated',
        artist: 'The Trash Pandas',
        album_name: 'Weekly Pickup',
        length_in_seconds: 244
      },
      {
        title: 'Smash Hit',
        artist: 'Another Band',
        album_name: 'The Famous One',
        length_in_seconds: 464
      },
      {
        title: 'Memories',
        artist: 'Junk',
        album_name: 'Hoarded',
        length_in_seconds: 304
      }
    ]
  }
  res.json({ status: 'ok', library })
})

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
