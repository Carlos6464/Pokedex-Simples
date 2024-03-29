let offset = 0;
const limit = 8;
const maxRecords = 151;

const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonList = document.getElementById('pokemonList');


const pokeapi = new PokeApi()

const convertPokemonToLi = (pokemon) => {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <a href="https://carlos6464.github.io/Pokedex-Simples/single?pokemon=${pokemon.number}"><img src="${pokemon.photo}"
                alt="${pokemon.name}"></a>
            </div>
        </li>
    `
}

const  loadPokemonItens = (offset, limit) => {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => convertPokemonToLi(pokemon)).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})















