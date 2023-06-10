import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../api"
import EmployeeContext from "../Context/Context"

const EditEmployee = () => {
    // const employeeContext = useContext(EmployeeContext)

    const [employee, setEmployee] = useState({ ime: "", prezime: "", adresa: "", email: "", telefon: "", vrtic: "" })
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchEmployee = async () => {

        try {
            const employee = await axios.get(`${API_URL}/employee/${id}`)
            setEmployee(employee.data)

        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchEmployee()
    }, [id])


    const handleChange = (e) => {
        e.preventDefault()
        
        if (employee.ime !== "" && employee.prezime !== "" && employee.adresa !== "" && employee.email !== "" && employee.telefon !== "" && employee.vrtic !== "") {
            const updateEmployee = axios.put(`${API_URL}/employee/${id}`, employee, { 'Content-Type': 'application/json' })
            // employeeContext.setEmployee(employee)
            alert("Korisnik je azuriran!")
            navigate("/employee")
        }

    }

    return (
        <div className="containerEmployeeAdd">
            <h2>Izmeni podatke:</h2>

            <form id="addProfesora" onSubmit={handleChange}>
                <input type="text" placeholder="Unesite ime" value={employee.ime} className="input input-ime" onChange={(e) => setEmployee({ ...employee, ime: e.target.value })} />
                <input type="text" placeholder="Unesite prezime" value={employee.prezime} className="input input-prezime" onChange={(e) => setEmployee({ ...employee, prezime: e.target.value })} />
                <input type="text" placeholder="Unesite adresu" value={employee.adresa} className="input input-adrtesa" onChange={(e) => setEmployee({ ...employee, adresa: e.target.value })} />
                <input type="text" placeholder="Unesite ime vrtica" value={employee.vrtic} className="input input-vrtic" onChange={(e) => setEmployee({ ...employee, vrtic: e.target.value })} />
                <input type="email" placeholder="Unesite email" value={employee.email} className="input input-email" onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />
                <input type="text" placeholder="Unesite telefon" value={employee.telefon} className="input input-phone" onChange={(e) => setEmployee({ ...employee, telefon: e.target.value })} />

                <button type="submit" className="submitProfesora">Submit</button>


            </form>
        </div>
    )
}
export default EditEmployee