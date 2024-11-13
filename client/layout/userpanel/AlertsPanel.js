import "@/styles/userpanel/alertsPanel.scss"

const AlertsPanel = ({alertPanelRef})=>{
    return(
        <div className="alertsPanel" ref={alertPanelRef}>
            <h2>powiadomienia</h2>
            <div className="alert">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum odio ducimus error distinctio enim dolore pariatur facilis maxime harum nemo. Nemo rem fugiat, mollitia quisquam nesciunt ipsa voluptate distinctio commodi.
            </div>
            {/* tutaj to automatyzujesz */}
        </div>
    )
}
export default AlertsPanel;