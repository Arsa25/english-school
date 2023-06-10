import { Link } from "react-router-dom"



const Home = () => {
    return (
        <div>
            <div className="home_container">

                <div className="home_menu">
                    <div className="btn btn_employee">
                        <img className="img img1" src={require('./imgHome/employee.jpg')} alt="employee" />
                        <Link className="link" to={"/employee"}>Employee</Link>
                    </div>

                    <div className="btn btn_kindergarden">
                        <img className="img img2" src={require('./imgHome/kindergarden.jpg')} alt="kindergarden" />
                        <Link className="link" to={"/kindergarden"}><p>Kindergarden</p></Link>
                    </div>

                    <div className="btn btn_map">
                        <img className="img img3" src={require('./imgHome/map.jpg')} alt="map" />
                        <Link className="link" to={"/map"}><p>Map</p></Link>
                    </div>

                    <div className="btn btn_financy">
                        <img className="img img4" src={require('./imgHome/financy.jpg')} alt="financy" />
                        <Link className="link" to={"/financy"}><p>Financy</p></Link>
                    </div>
                </div>

                <div className="table-container"></div>
            </div>
        </div>
    )



}

export default Home


