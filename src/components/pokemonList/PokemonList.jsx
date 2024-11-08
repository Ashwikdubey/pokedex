import Pokemon from "../pokemon/Pokemon"
import {loadList} from "../hooks/usePokemonList"

function PokemonList(){
    const [pokemonListState,setPokemonListState]=loadList()
    console.log(pokemonListState)
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