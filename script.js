// const cards = document.querySelector(".cards")
// // const card = cardHtml;

// for (let i = 0; i < 30; i++) {
//     const clone = cardHtml.cloneNode(true);
//     cards.appendChild(clone)
// }

// const colors = {
//     Normal: '#A8A77A',
//     Fire: '#EE8130',
//     Water: '#6390F0',
//     Electric: '#F7D02C',
//     Grass: '#7AC74C',
//     Ice: '#96D9D6',
//     Fighting: '#C22E28',
//     Poison: '#A33EA1',
//     Ground: '#E2BF65',
//     Flying: '#A98FF3',
//     Psychic: '#F95587',
//     Bug: '#A6B91A',
//     Rock: '#B6A136',
//     Ghost: '#735797',
//     Dragon: '#6F35FC',
//     Dark: '#705746',
//     Steel: '#B7B7CE',
//     Fairy: '#D685AD',
// }

// const style = []
// for (const key in colors) {
//     const css = `
//    .bg-${key} {
//        background: linear-gradient(to top right,${colors[key]},#3d3d3d 25%);

//    }
//    .${key}{
//     background-color: ${colors[key]}; 
//    }
//    `;

//     style.push(css)

// }

const types = [

    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
];

const cardHtml = `
<div class="card" id ="card-{id}">
    <div class="title"> 
    <h2>{name}</h2>
       <small># {id}</small>  
   </div>  
     <div class="img bg-{type}">
         <img src="https://pokeres.bastionbot.org/images/pokemon/{id}.png" alt="{name}">
     </div>
     <div class="type {type}">
         <p>{type}</p>
     </div>
     <button class="favorite" data-id ={id}>
         <div class="heart">

         </div>
     </button>
`;

const cards = document.querySelector(".cards");


const pokemon_count = 10;

const getType = (data) => {
    const apiTypes = data.map((type) => type.type.name);
    const type = types.find((type) => apiTypes.indexOf(type) > -1);
    return type;
};

const fetchPokemons = async (number) => {

    if (number === undefined) return;
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`;

    const responce = await fetch(url).then((responce => responce.json()))
    const {
        id,
        name,
        types
    } = responce
    const type = getType(types)

    return {
        id,
        name,
        type
    };
}
const buscaPokemon = async () => {

    for (let index = 1; index <= pokemon_count; index++) {
        const pokemon = await fetchPokemons(index)
        createPokemonCard(pokemon)
    }

}
const replacer = (text, source, destination) => {
    const regex = new RegExp(source, 'gi');

    return text.replace(regex, destination);
}
const createPokemonCard = (pokemon) => {
    const {
        id,
        name,
        type
    } = pokemon;
    let newcard = replacer(cardHtml, `\{id\}`, id);
    newcard = replacer(newcard, `\{name\}`, name);
    newcard = replacer(newcard, `\{type\}`, type);

    cards.innerHTML += newcard;
}


buscaPokemon();