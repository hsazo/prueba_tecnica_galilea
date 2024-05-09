import {gql} from "apollo-angular"


const GET_POKEMON = gql `
query  ($limit: Int, $offset: Int){
    pokemon: pokemon_v2_pokemon( order_by: {id: asc}, limit: $limit, offset: $offset) {
      name
      id
      height
      weight
    }
  }
`

const GET_POKEMON_COUNT = gql `
query CountQuery {
  pokemon_v2_pokemon_aggregate {
    aggregate {
      count
    }
  } 
}
`

const GET_POKEMON_DATA = gql `
query ($id: Int) {
  specificPokemon: pokemon_v2_pokemon(where: {id: {_eq : $id}}) {
    name
    id
    height
    weight
    base_experience
    pokemon_v2_pokemoncries {
      cries 
    }
    pokemon_v2_pokemonsprites {
      sprites 
    }
  }
}
`

export {GET_POKEMON, GET_POKEMON_COUNT, GET_POKEMON_DATA}





