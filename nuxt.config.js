import axios from 'axios';

export default {
  target: 'static',
  head: {
    title: 'my-nuxt-2-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  generate: {
    async routes() {
      // Axios is required here unless you're using Node 18
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
      const pokemons = res.data.results;

      return pokemons.map(pokemon => {
        return '/pokemon/' + pokemon.name
      })
    }
  }
}
