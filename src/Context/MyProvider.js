import axios from "axios"
import { API_URL } from "../api";
import EmployeeContext from "./Context";
import { useState, useEffect } from "react"

const MyProvider = ({ children }) => {

    const [refreshEmployeeData, setRefreshEmployeeData] = useState("true");
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
        if (refreshEmployeeData==="true") {
            shareData();
            setRefreshEmployeeData("false");
        }
    }, [refreshEmployeeData]);
    
    return (
        <EmployeeContext.Provider value={{employee ,setEmployee,refreshEmployeeData, setRefreshEmployeeData}}>{children}</EmployeeContext.Provider>
    )
}


export default MyProvider



