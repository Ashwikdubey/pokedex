import { useEffect, useState } from "react";
import axios from "axios"

export function loadList(){
    // const[loading,setLoading]=useState(true)
    // const[pokemonList,setpokemonList]=useState([])
    // const[pokedexURL,setPokedexURL]=useState("")
    // const[nextURL,setNextURL]=useState("")
    // const[prevURL,setPrevURL]=useState("")
    const[pokemonListState,setPokemonListState]=useState({
        pokemonList:[],
        pokedexURL:"https://pokeapi.co/api/v2/pokemon",
        nextURL:"",
        prevURL:"",
        loading:true
    })
    async function load(){
        setPokemonListState({...pokemonListState,loading:true})
        const response = await axios.get(pokemonListState.pokedexURL) // this downloads list of 20 pokemons
        setPokemonListState((state)=>({
            ...state,
            nextURL:response.data.next,
            prevURL:response.data.previous
        }))

        const pokemonResults = response.data.results;  // we get the array of pokemons from result

        const pokemonResultPromise = pokemonResults.map((pokemon) =>axios.get(pokemon.url));
        

        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
        

        const res=pokemonData.map((elem)=>{
            return{
                name:elem.data.name,
                id:elem.data.id,
                image:elem.data.sprites.other.dream_world.front_default,
                type:elem.data.types
            }
        })
        
      setPokemonListState((state)=>({
        ...state,
        pokemonList:res,
        loading:false
      }))
    }
    useEffect(()=>{load()},[pokemonListState.pokedexURL])
    return[pokemonListState,setPokemonListState]
}