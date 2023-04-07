class PokeApi {

  convertPokeApiDetailToPokemon = (pokeDetail) => {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types //destruction

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon

  }

  getPokemonDetail = (pokemon) => {
      return fetch(pokemon.url)
                  .then((response) => response.json())
                  .then(this.convertPokeApiDetailToPokemon)

  }

  getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
              .then((response) => response.json())
              .then((jsonBody) => jsonBody.results)
              .then((pokemons) => pokemons.map((pokemon) => this.getPokemonDetail(pokemon)))
              .then((detailRequest) => Promise.all(detailRequest))
              .then((pokemonDetail) => pokemonDetail)
  }

  getPokemonSingle = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    return fetch(url)
              .then((response) => response.json())
              .then((jsonBody) => jsonBody)
              .then((pokemon) =>  this.convertPokeApiDetailToPokemon(pokemon))
              .then((pokemonDetail) => pokemonDetail)          
  }
}