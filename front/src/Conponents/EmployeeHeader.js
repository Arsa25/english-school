import { Link } from "react-router-dom"
// import { Navigate } from "react-router-dom"
// import { API_URL } from "../api"
// import React, { Component } from "react"


const EmployeeHeader = () => {

    return (
        <div>
            <header id="header">
                <div>
                    <ul className="navigacija">
                        <li><Link to={"/home"}><p>Home</p></Link></li>
                        <li><Link to={"/employee"}><p>Profesori</p></Link></li>
                        <li><Link to={"/kindergartens"}><p>Vrtici</p></Link></li>
                        <li><Link to={"/financy"}><p>finansije</p></Link></li>
                        <li><Link to={"/map"}><p>mapa</p></Link></li>
                    </ul>
                </div>
            </header>
        </div>

    )
}
export default EmployeeHeader