import { Route, Routes } from "react-router-dom"
import Pokedex from "../pokedex/Pokedex"
import PokemonDetails from "../pokemondetails/PokemonDetails"

function CustomRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Pokedex/>}/>
            <Route path="/pokemon/:id" element={<PokemonDetails/>}/>
        </Routes>
    )
}
export default CustomRoutes