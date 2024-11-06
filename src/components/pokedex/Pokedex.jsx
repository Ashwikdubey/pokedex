import { useState } from "react";
import PokemonList from "../pokemonList/PokemonList";
import Search from "../searchbar/Searchbar";
import PokemonDetails from "../pokemondetails/PokemonDetails";

function Pokedex() {
  const[searchTerm,setSearchterm]=useState("")
  return (
    <>
      <div className="w-full">
        <h1 className="text-center text-4xl tracking-widest my-4">Pokedex</h1>
        <Search updateSearchTerm={setSearchterm}/>
        {searchTerm.length===0?<PokemonList/>:<PokemonDetails key={searchTerm} pokemonName={searchTerm}/>}
      </div>
    </>
  );
}
export default Pokedex
