import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function loadDetails(pokemonName){
    const[details,setDetails]=useState({})
    const {id}=useParams()
    const load=async function(){
        try{
            let response;
            if(pokemonName){
                response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            }
            else{
                response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            }
            console.log(response)
            const res={
                name:response.data.name,
                height:response.data.height,
                weight:response.data.weight,
                types:response.data.types.map((t)=>t.type.name),
                image:response.data.sprites.other.dream_world.front_default 
            }
            console.log(res)
            setDetails(res)

        }
        catch(error){
            console.log("something went wrong")
        };
            }
    useEffect(()=>{load()},[])
    return details
}