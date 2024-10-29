import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function PokemonDetails(){
    const[details,setDetails]=useState({})
    const {id}=useParams()
    const load=async function(){
        const response=await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
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
    useEffect(()=>{load()},[])
    return(
        <div className="flex items-center justify-center p-20">
        <div className="flex space-x-5  items-center">
            <img src={details.image} className="h-72 w-72" alt="" />
            <div className="flex flex-col space-y-3">
            <span className="tracking-[0.5rem] capitalize font-medium text-lg">{details.name}</span>
            <span className="font-medium text-lg">height:<span className="font-normal text-base">{details.height}</span></span>
            <span className="font-medium text-lg">weight:<span className="font-normal text-base">{details.weight}</span></span>
            <span className="flex gap-2 capitalize font-medium text-lg">types:
            {
                details.types&&details.types.map((t)=>
                    <span key={t} className="font-normal text-base">{t}</span>
                )
            }
            </span>
            </div>
        </div>
        </div>
    )
}
export default PokemonDetails