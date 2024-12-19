import SwiperBox from "../mapPage/SwiperBox"

const EditPanel = ({eventAuthor,eventName,eventDesc,eventAddress,edit})=>{
    return(
        <>
            <p className="eventAuthor">
                {eventAuthor}
            </p>
            <p>
                <span>
                    {eventName}
                </span> 
                {edit && 
                    <>
                        <div className="space"></div>
                        <form>
                            <input type="text" />
                            <input type="submit" value="dodaj" />
                        </form> 
                    </>
                }
            </p>
            <p>
                <span>
                    {eventDesc}
                </span>
                {edit && 
                    <>
                        <div className="space"></div>
                        <form>
                            <input type="text" />
                            <input type="submit" value="dodaj" />
                        </form> 
                    </>
                }
            </p>
            <p>
                <span>
                    {`${eventAddress.city}, ${eventAddress.cityNumber}, ${eventAddress.address}`}
                </span>
                {edit && 
                    <>
                        <div className="space"></div>
                        <form>
                            <input type="text" />
                            <input type="submit" value="dodaj" />
                        </form> 
                    </>
                }
            </p>
            <div className="swiperContainer">
                <SwiperBox/>
                {edit && 
                    <>
                        <div className="space"></div>
                        <form>
                            <input type="file" />
                            <input type="file" />
                            <input type="file" />
                            <input type="submit" value="dodaj" />
                        </form> 
                    </>
                }
            </div>
        </>
    )
}
export default EditPanel