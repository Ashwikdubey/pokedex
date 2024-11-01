import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import Pokemon from "../pokemon/Pokemon"

function PokemonList({search}){
    // const[loading,setLoading]=useState(true)
    // const[pokemonList,setpokemonList]=useState([])
    // const[pokedexURL,setPokedexURL]=useState("")
    // const[nextURL,setNextURL]=useState("")
    // const[prevURL,setPrevURL]=useState("")
    console.log(search)
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
    return (
        <>
        <div>
        <div className="flex flex-wrap box-border w-full items-center justify-center mt-8">
       {pokemonListState.loading?(
            <div>loading...</div>
        ):pokemonListState.pokemonList.map((elem)=>
            (<Pokemon name={elem.name} image={elem.image} key={elem.id} id={elem.id}/>)
        )}
       </div>
       <div className="justify-center flex gap-8 py-6">
        <button className="py-3 px-6 bg-transparent  rounded-md  cursor-pointer font-semibold text-sm tracking-[0.5rem] bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed" onClick={()=>{
            setPokemonListState({...pokemonListState,pokedexURL:pokemonListState.prevURL})}} disabled={pokemonListState.prevURL===null}>Prev</button>
        <button className="py-3 px-6 bg-transparent  rounded-md  cursor-pointer font-semibold text-sm tracking-[0.5rem] bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed" onClick={()=>{setPokemonListState({...pokemonListState,pokedexURL:pokemonListState.nextURL})}} disabled={pokemonListState.nextURL===null}>Next</button>
       </div>
        </div>
        </>
    )
}
export default PokemonList