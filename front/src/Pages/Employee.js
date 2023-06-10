import EmployeeHeader from "../Conponents/EmployeeHeader"
import EmployeeHandler from "../Conponents/EmployeeHandler"
import { useState, useEffect } from "react"
import axios from "axios"
import { API_URL } from "../api"
import EmployeeContext from "../Context/Context"



const Employee = () => {

    const [employee, setEmployee] = useState([])
    const [a, setA] = useState([])


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

    const fetchEmployeeFilter = async (a) => {
        const zaposleni = a
        try {
            for (let i = 0; i < zaposleni.length; i++) {
                const employee = await axios.get(`${API_URL}/employee/${zaposleni[i]._id}`)
                setEmployee(employee.data)
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchEmployeeFilter()
    }, [])

    return (
        <>
            <EmployeeContext.Provider value={{ employee, setEmployee, a, setA }}>
                <EmployeeHeader />
                <EmployeeHandler />
            </EmployeeContext.Provider>
        </>
    )
}
export default Employee