import "@/styles/mapPage/interface/panels/details.scss"

const Details = ({title,author,desc})=>{
    return(
        <div className="details">
            <h1>{title}</h1>
            <h2>{author}</h2>
            <p>{desc}</p>
        </div>
    )
}
export default Details;