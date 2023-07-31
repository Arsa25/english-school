import EmployeeHeader from "../Conponents/EmployeeHeader"
import EmployeeTable from "../Conponents/EmployeeTable"
import { useState, useEffect } from "react"
import axios from "axios"
import { API_URL } from "../api"
import EmployeeContext from "../Context/Context"



const Employee = () => {    

    return (
        <>
            
                <EmployeeHeader />
                <EmployeeTable />
            
        </>
    )
}
export default Employee