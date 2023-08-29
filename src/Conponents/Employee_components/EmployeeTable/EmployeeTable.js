import HeaderTable from "./HeaderTable"
import { useState, useEffect, useContext, useMemo, useRef } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../../../api"
import EmployeeContext from "../../../Context/Context"


var idArray = []


const EmployeeTable = () => {
    
    const employeeContext = useContext(EmployeeContext)
    const { setRefreshEmployeeData } = useContext(EmployeeContext);

    const employee = useMemo(() => employeeContext.employee, [employeeContext.employee]);
    const [A, setA] = useState(employee)

     // Pozivate funkciju da osvežite podatke
    
    
    const curentFilter = useRef("")

    useEffect(() => {
        setRefreshEmployeeData("true")
        setA(employee)
    }, [employee,A])


    //filter
    const [filterInput, setFilterInput] = useState("")

    const submitForm = (e) => {

        e.preventDefault()
        const inputValue = filterInput
        curentFilter.current = inputValue
        applyFilter()
    }
    const applyFilter = () => {
        if (curentFilter.current === "") {
            setA(employee);
        } else {
            const search = employee.filter((elem) =>
                elem.ime.toLowerCase().includes(curentFilter.current.toLowerCase()) ||
                elem.prezime.toLowerCase().includes(curentFilter.current.toLowerCase()) ||
                elem.vrtic.toLowerCase().includes(curentFilter.current.toLowerCase()) ||
                elem.adresa.toLowerCase().includes(curentFilter.current.toLowerCase()) ||
                elem.email.toLowerCase().includes(curentFilter.current.toLowerCase()) ||
                elem.telefon.toLowerCase().includes(curentFilter.current.toLowerCase())
            );
            setA(search);
        }
    }

    //delete
    const counterCheckBox = (id) => {
        try {
            const checkArray = idArray
            const check = checkArray.find((elem) => elem === id)
            if (check !== undefined) {
                let newIdArray = idArray.filter((elem) => elem !== check)
                idArray = newIdArray
            }
            else {
                idArray.push(id)
            }
        } catch (err) { console.log(err); }
    }

    const buttonHandler = () => {

        if (idArray.length !== 0) {
            deleteF(idArray)
        } else {
            alert("Prvo oznacite profesora.")
        }
    }

    const deleteF = async (id) => {
        let idArra = id
        try {
            if (window.confirm("Da li ste sigurni")) {
                for (let i = 0; i < idArra.length; i++) {
                    axios.delete(`${API_URL}/employee/${idArra[i]}`)
                    // var filter = employeeContext.employee.filter((elem) => elem._id !== idArra[i])
                }
                // setA(filter)
                idArra = []
                idArray = []
                setA(employee)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    //sorting
    const columns = ['ime', 'prezime', 'vrtic', 'adresa', 'email', 'telefon']
    const [sorting, setSorting] = useState({ column: "ime", order: "asc" });
    const sortTable = (newSorting) => {
        setSorting(newSorting)
    }

    // newEmployeeContext.ime && newEmployeeContext.prezime && newEmployeeContext.vrtic && newEmployeeContext.adresa && newEmployeeContext.email && 
    return (
        <>
            <div className="container">

                <div className="add_edit">
                    <Link className="btn btn-addprofessor" to={`/AddEmployee`}><p>+ Profesor</p></Link>
                    <form className="search-bar" onSubmit={submitForm}>
                        <input type="text" placeholder="Search..." value={filterInput} onChange={(e) => setFilterInput(e.target.value)} />
                    </form>

                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <HeaderTable A={A} setA={setA} columns={columns} sorting={sorting} sortTable={sortTable} />
                            <th><button className="btn btn-delete" onClick={buttonHandler}>Delete</button></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            A.map((elem) => (
                                <tr key={elem._id}>
                                    {columns.map(column => (
                                        <td key={column}>{elem[column]}</td>
                                    ))}
                                    <td><input className="checkbox" type="checkbox" value={elem._id} onClick={(e) => counterCheckBox(e.target.value)}></input></td>
                                    <td><Link className="btn btn-edit" to={`/editEmployee/${elem._id}`}>Edit</Link></td>
                                </tr>

                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )


}

export default EmployeeTable