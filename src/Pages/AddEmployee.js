import axios from "axios"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../api";
import EmployeeContext from "../Context/Context";

const AddEmployee = () => {

    const { setRefreshEmployeeData } = useContext(EmployeeContext);
    const [employee, setEmployee] = useState({ ime: "", prezime: "", vrtic: "", adresa: "", email: "", telefon: "" })
    const navigate = useNavigate();

    const createEmployee = async (data) => {
        try {
            await axios.post(`${API_URL}/employee`, data)
        } catch (err) {
            console.log(err);
        }
    }

    const handleChange = (e) => {
        e.preventDefault()
        
        if (employee.ime !== "" && employee.prezime !== "" && employee.adresa !== "" && employee.email !== "" && employee.telefon !== "" && employee.vrtic !== "") {
            createEmployee(employee)
            setRefreshEmployeeData("true")
            alert("Profesor je kreiran!")
            navigate("/employee")
        }

    }

    return (
        <div className="containerEmployeeAdd">

            <form id="addProfesora" onSubmit={handleChange}>
                <input type="text" placeholder="Unesite ime" className="input input-ime" required={true} onChange={(e) => setEmployee({ ...employee, ime: e.target.value })} />
                <input type="text" placeholder="Unesite prezime" className="input input-prezime" required={true} onChange={(e) => setEmployee({ ...employee, prezime: e.target.value })} />
                <input type="text" placeholder="Unesite adresu" className="input input-adrtesa" required={true} onChange={(e) => setEmployee({ ...employee, adresa: e.target.value })} />
                <input type="email" placeholder="Unesite email" className="input input-email" required={true} onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                <input type="text" placeholder="Unesite phone" className="input input-phone" required={true} onChange={(e) => setEmployee({ ...employee, telefon: e.target.value })} />
                <input type="text" placeholder="Unesite vrtic" className="input input-vrtic" required={true} onChange={(e) => setEmployee({ ...employee, vrtic: e.target.value })} />

                <input type="submit" placeholder="Submit" className="submitProfesora" />


            </form>
        </div>
    )

}

export default AddEmployee