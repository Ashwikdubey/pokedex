import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import Pokemon from "../pokemon/Pokemon"

function PokemonList(){
    const[loading,setLoading]=useState(true)
    const[pokemonList,setpokemonList]=useState([])
    const[pokedexURL,setPokedexURL]=useState("https://pokeapi.co/api/v2/pokemon")
    const[nextURL,setNextURL]=useState("")
    const[prevURL,setPrevURL]=useState("")

    async function load(){
        setLoading(true)
        const response = await axios.get(pokedexURL) // this downloads list of 20 pokemons
        setNextURL(response.data.next)
        setPrevURL(response.data.previous)

        const pokemonResults = response.data.results;  // we get the array of pokemons from result

        const pokemonResultPromise = pokemonResults.map((pokemon) =>axios.get(pokemon.url));
        

        // passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detailed data
        console.log(pokemonData)
        

        const res=pokemonData.map((elem)=>{
            return{
                name:elem.data.name,
                id:elem.data.id,
                image:elem.data.sprites.other.dream_world.front_default,
                type:elem.data.types
            }
        })
        
        setpokemonList(res)
        setLoading(false)

    }
    useEffect(()=>{load()},[pokedexURL])
    return (
        <>
        <div>
        <div className="flex flex-wrap box-border w-full items-center justify-center mt-8">
       {loading?(
            <div>loading...</div>
        ):pokemonList.map((elem)=>
            (<Pokemon name={elem.name} image={elem.image} key={elem.id} id={elem.id}/>)
        )}
       </div>
       <div className="justify-center flex gap-8 py-6">
        <button className="py-3 px-6 bg-transparent  rounded-md  cursor-pointer font-semibold text-sm tracking-[0.5rem] bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed" onClick={()=>{setPokedexURL(prevURL)}} disabled={prevURL===null}>Prev</button>
        <button className="py-3 px-6 bg-transparent  rounded-md  cursor-pointer font-semibold text-sm tracking-[0.5rem] bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed" onClick={()=>{setPokedexURL(nextURL)}} disabled={nextURL===null}>Next</button>
       </div>
        </div>
        </>
    )
}
export default PokemonList