import { loadDetails } from "../hooks/usePokemonDetails"

function PokemonDetails({pokemonName}){
  const details=loadDetails(pokemonName)
    return(
        <>
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
        </>
        
    )
}
export default PokemonDetails