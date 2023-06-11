import EmployeeHeader from "../Conponents/EmployeeHeader"
import EmployeeHandler from "../Conponents/EmployeeHandler"
import { useState, useEffect } from "react"
import axios from "axios"
import { API_URL } from "../api"
import EmployeeContext from "../Context/Context"



const Employee = () => {

    const [employee, setEmployee] = useState([])
   


    const fetchEmployee = async () => {

        try {
            const employee = await axios.get(`${API_URL}/employee`)
            setEmployee(employee.data)
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchEmployee()
    }, [])


    return (
        <>
            <EmployeeContext.Provider value={{ employee, setEmployee}}>
                <EmployeeHeader />
                <EmployeeHandler />
            </EmployeeContext.Provider>
        </>
    )
}
export default Employee