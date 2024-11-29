import "@/styles/mapPage/interface/mapAlert.scss"

const MapAlert = ({alert,mapAlertRef})=>{
    return(
        <div className="MapAlert" ref={mapAlertRef}>
            {alert}
        </div>
    )
}
export default MapAlert;