import EmployeeHeader from "../Conponents/EmployeeHeader"
import EmployeeTable from "../Conponents/EmployeeTable"
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
                <EmployeeTable />
            </EmployeeContext.Provider>
        </>
    )
}
export default Employee