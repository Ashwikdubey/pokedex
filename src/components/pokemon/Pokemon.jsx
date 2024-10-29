import { Link } from "react-router-dom"

function Pokemon({name,image,id}){
    return(
        <>
        <Link to={`/pokemon/${id}`} className="flex flex-col basis-[20%] items-center justify-center my-10 hover:bg-orange-100 cursor-pointer rounded-md">
        
        <div className="tracking-[0.7rem] my-5 font-semibold capitalize">{name}</div>
        <img src={image} alt="" className="h-40 w-40" />
        
        </Link>
        </>
    )
}
export default Pokemon