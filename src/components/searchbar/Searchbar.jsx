import PokemonList from "../pokemonList/PokemonList"

function Search(){
    return(
        <>
        <div className="w-[40rem] mx-auto">
        <input type="search" placeholder="enter name of pokemon..." className="py-3 px-6 border-[1.5px] border-gray-300 w-full rounded-md font-mono capitalize outline-none"/>
        </div>
        </>
    )
}
export default Search