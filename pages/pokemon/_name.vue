<template>
  <div>
    <button
      @click="$router.go(-1)"
      class="backBtn"
      aria-label="Go back"
    ></button>
    <img
      class="pokeImage"
      :src="pokemon.image"
      :alt="`${pokemon.name} picture`"
    />
    <div class="infoContainer">
      <h1 class="header">No. {{ pokemon.id }}: {{ pokemon.name }}</h1>
      <table class="pokeInfo">
        <tbody>
          <tr>
            <th>Types</th>
            <td>{{ pokemon.types }}</td>
          </tr>
          <tr>
            <th>Height</th>
            <td>{{ pokemon.height }}</td>
          </tr>
          <tr>
            <th>Weight</th>
            <td>{{ pokemon.weight }}</td>
          </tr>
        </tbody>
      </table>
      <p class="flavor">{{ pokemon.flavorText }}</p>
    </div>
  </div>
</template>

<script>
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default {
  async asyncData({ params }) {
    const { name } = params;
    const [pokemon, species] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) =>
        res.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then((res) =>
        res.json()
      ),
    ]);

    return {
      pokemon: {
        id: pokemon.id,
        image: pokemon.sprites.front_default,
        name: capitalize(pokemon.name),
        height: pokemon.height,
        weight: pokemon.weight,
        flavorText: species.flavor_text_entries[0].flavor_text,
        types: pokemon.types.map(({ type }) => type.name).join(", "),
      },
    };
  },
  layout: 'default',
  head() {
    return {
      title: `Pokedex: ${this.pokemon.name}`
    }
  }
};
</script>

<style scoped>
.backBtn {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: unset;
  border: unset;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='white'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z'/%3E%3C/svg%3E");
  height: 2rem;
  width: 2rem;
  background-repeat: no-repeat;
  background-size: contain;
}

.infoContainer {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;
}

.pokeImage {
  width: 100%;
  height: 60%;
  max-height: 300px;
  object-fit: contain;
  image-rendering: crisp-edges;
}

.header {
  background: #dbdcd9;
  text-align: center;
  text-transform: capitalize;
  padding: 0.25rem;
  margin: 0;
  border-radius: 1rem 1rem 0 0;
  padding: 0.5rem;
}

.flavor {
  margin: 0;
  padding: 1rem;
  background: white;
  border-radius: 0 0 1rem 1rem;
}

.pokeInfo {
  border-collapse: collapse;
  font-size: 1.25rem;
  text-transform: capitalize;
}

.pokeInfo tr:not(:last-child) {
  border-bottom: 2px solid #d2d2d2;
}

.pokeInfo th,
.pokeInfo td {
  padding: 0.5rem;
}

.pokeInfo th {
  background: #dbdcd9;
}

.pokeInfo td {
  background: white;
}
</style>
