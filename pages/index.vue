<template>
  <ul class="plain-list pokeList">
            <li v-for="pokemon of pokemons" class="pokemonListItem" :key="pokemon.name">
                <NuxtLink class="pokemonContainer" :to="`/pokemon/${pokemon.name}`">
                    <p class="pokemonId">No. {{pokemon.id}}</p>
                    <img
                      class="pokemonImage"
                      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`" 
                      :alt="`${pokemon.name} picture`"/>
                    <h2 class="pokemonName">{{pokemon.name}}</h2>
                </NuxtLink>
            </li>
    </ul>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  layout: 'default',
  async asyncData() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
    const resJson = await res.json();
    const pokemons = resJson.results.map(pokemon => {
        const name = pokemon.name;
        // https://pokeapi.co/api/v2/pokemon/1/
        const url = pokemon.url;
        const id = url.split("/")[url.split("/").length - 2];
        return {
            name,
            url,
            id
        }
    });
    return {
      pokemons,
    }
  },
  head() {
    return {
      title: "Pokedex: Generation 1"
    }
  }
});
</script>

<style scoped>
.pokeList {
  display: grid;
  grid-template-columns: repeat( auto-fit, minmax(250px, 1fr) );
  gap: 1rem;
}

.pokemonListItem {
  aspect-ratio: 1;
  border-radius: 1rem;
  border: 1px solid #dedede;
  overflow: hidden;
  background: rgba(237, 30, 36, 0.2);
}

.pokemonContainer {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  grid-template-columns: 1fr;
  text-decoration: none;
}

.pokemonImage {
  height: 100%;
  width: 100%;
  object-fit: contain;
  image-rendering: crisp-edges;
}

.pokemonId {
  margin: 0;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  background: rgba(237, 30, 36, 0.4);
  color: white;
}

.pokemonName {
  padding: 1rem;
  margin: 0;
  background: white;
  text-transform: capitalize;
  color: #3e3b42;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>