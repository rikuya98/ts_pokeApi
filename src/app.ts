const baseUri: string = "https://pokeapi.co/api/v2/pokemon/"
const nameUri: string = "https://pokeapi.co/api/v2/pokemon-species/"
const searchButton = document.querySelector('#search-btn')!;
const randomButton = document.querySelector('#random-btn')!;
const imgFrom: HTMLImageElement = document.querySelector('#pokemon-image')!;
const POKEMON_MAX_ID: number = 1000;
const POKEMON_MIN_ID: number = 1;

interface PokemonLanguageEntry {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }

async function showPokeData(pokeId :string) {
    const res = await fetch(`${baseUri}${pokeId}`);
    const json = await res.json();
    const pokeData = json.sprites.front_default;
    return pokeData
}
searchButton.addEventListener('click', async () => {
    const pokeFrom:HTMLInputElement = document.querySelector('#poke-form')!;
        const searchKey:string = pokeFrom.value
        const imgData:string = await showPokeData(searchKey)
        await showPokeName(searchKey)
        imgFrom.src = imgData
}
)

randomButton.addEventListener('click', async ()=> {
    const randomId = getRandomId(POKEMON_MIN_ID, POKEMON_MAX_ID).toString();
    const imgData = await showPokeData(randomId)
    await showPokeName(randomId)
    imgFrom.src = imgData
})

function getRandomId(min :number,max :number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function showPokeName(pokeId: string) {
    const pokeName = document.querySelector('#poke-name')!;
    const res = await fetch(`${nameUri}${pokeId}`);
    const json = await res.json();
    const jaPokeName = json.names.find((nameEntry: PokemonLanguageEntry) => nameEntry.language.name === 'ja');
    pokeName.textContent = `${jaPokeName.name}`
}