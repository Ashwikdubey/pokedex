import { useState } from "react";
import PokemonList from "../pokemonList/PokemonList";
import Search from "../searchbar/Searchbar";

function Pokedex() {
  return (
    <>
      <div className="w-full">
        <h1 className="text-center text-4xl tracking-widest my-4">Pokedex</h1>
        <Search/>
        <PokemonList/>
      </div>
    </>
  );
}
export default Pokedex
