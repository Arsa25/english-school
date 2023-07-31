import axios from "axios"
import { API_URL } from "../api";
import EmployeeContext from "./Context";
import { useState, useEffect } from "react"

const MyProvider = ({ children }) => {

    const [employee, setEmployee] = useState([])

    const shareData = async () => {
        try {
            const employee = await axios.get(`${API_URL}/employee`)
            setEmployee(employee.data)
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        shareData()
    }, [])

    return (
        <EmployeeContext.Provider value={{employee , setEmployee}}>{children}</EmployeeContext.Provider>
    )
}


export default MyProvider



