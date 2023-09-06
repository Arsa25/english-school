import axios from "axios"
import { API_URL } from "../api";
import EmployeeContext from "./Context";
import { useState, useEffect } from "react"

const MyProvider = ({ children }) => {

    const [refreshEmployeeData, setRefreshEmployeeData] = useState("false");
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
        if (refreshEmployeeData==="false") {
            shareData();
            setRefreshEmployeeData("true");
        }
    }, [refreshEmployeeData]);
    
    return (
        <EmployeeContext.Provider value={{employee ,setEmployee,refreshEmployeeData, setRefreshEmployeeData}}>{children}</EmployeeContext.Provider>
    )
}


export default MyProvider



