const urlParams = new URLSearchParams(window.location.search)
const id = urlParams.get("pokemon")
const pokemonSigleHtml = document.getElementById('pokemonSingle');

const pokemonSingle = (pokemon) => {
     return `
     <div class="card">
        <img src="${pokemon.photo}" alt="${pokemon.name}" style="width:100%">
        <h1>${pokemon.name}</h1>
        <p class="price">${pokemon.number}</p>
        <ul>
          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ul>
     </div>
     `
}

const pokeapi = new PokeApi();
  const pokemonSingleDetail = (id) => {
    pokeapi.getPokemonSingle(id).then((pokemon) => {
      const newPokemon = pokemonSingle(pokemon)
      pokemonSigleHtml.innerHTML = newPokemon;  
  })
}
pokemonSingleDetail(id)




