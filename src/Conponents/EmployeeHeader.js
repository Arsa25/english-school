import { Link } from "react-router-dom"
// import { Navigate } from "react-router-dom"
// import { API_URL } from "../api"
// import React, { Component } from "react"


const EmployeeHeader = () => {

    return (
        <>
            <nav>
                <div className="navbar">

                    <input className="checkbox" type="checkbox"/>
                    <div className="hamburger-lines">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                        <span className="line line3"></span>
                    </div>

                    <ul className="navigacija">
                        <li><Link to={"/home"}><p>Home</p></Link></li>
                        <li><Link to={"/employee"}><p>Profesori</p></Link></li>
                        <li><Link to={"/kindergartens"}><p>Vrtici</p></Link></li>
                        <li><Link to={"/financy"}><p>finansije</p></Link></li>
                        <li><Link to={"/map"}><p>mapa</p></Link></li>
                    </ul>

                </div>
            </nav>
        </>

    )
}
export default EmployeeHeader