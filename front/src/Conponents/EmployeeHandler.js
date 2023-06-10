import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { API_URL } from "../api"
import EmployeeContext from "../Context/Context"
import HeaderTable from "./HeaderTable"


var idArray = []

const EmployeeHandler = () => {

    const employeeContext = useContext(EmployeeContext)
    var a = []
    a.push(employeeContext.employee)

    //filter

    const submitForm = (a) => {

        const searchValue = a.value

        const search = employeeContext.employee.filter((elem) => { return elem.ime.includes(searchValue) || elem.prezime.includes(searchValue) === searchValue || elem.vrtic.includes(searchValue) === searchValue || elem.adresa.includes(searchValue) === searchValue || elem.email.includes(searchValue) === searchValue || elem.telefon.includes(searchValue) === searchValue })
        
        employeeContext.setA(search)
    }
    //filter

    const buttonHandler = () => {

        if (idArray.length !== 0) {
            deleteF(idArray)
            idArray = []
        } else {
            alert("Prvo oznacite profesora.")
        }
    }

    const counterCheckBox = (id) => {
        try {
            const check = idArray.find(elem => elem._id === id)
            if (check) {
                let newIdArray = idArray.filter(elem => elem._id !== check)
                idArray = newIdArray
            }
            else {
                idArray.push(id)
            }
        } catch (err) { console.log(err); }
    }

    const deleteF = async (id) => {
        let idArra = id
        try {
            if (window.confirm("Da li ste sigurni")) {
                for (let i = 0; i < idArra.length; i++) {
                    axios.delete(`${API_URL}/employee/${idArra[i]}`)
                    var filtriraj = employeeContext.employee.filter((elem) => elem._id !== id)
                }
                employeeContext.setEmployee(filtriraj)
                idArra = []
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
        sortFunction(sorting.column, sorting.order)
    }
    //sort funkcija
    const sortFunction = (column, order) => {

        try {
            if (order === "asc") {

                a[0].sort((a, b) => {

                    const nameA = a.ime.toUpperCase();
                    const nameB = b.ime.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    return 0;
                })

            } else {
                a[0].sort((a, b) => {
                    const nameA = a.ime.toUpperCase();
                    const nameB = b.ime.toUpperCase();
                    if (nameA > nameB) {
                        return -1;
                    }
                    if (nameA < nameB) {
                        return 1;
                    }

                    return 0;
                })
            }

        }
        catch (err) { console.log(err); }

    }
    // newEmployeeContext.ime && newEmployeeContext.prezime && newEmployeeContext.vrtic && newEmployeeContext.adresa && newEmployeeContext.email && 
    //sorting
    return (
        <>
            <div className="container">

                <div className="add_edit">
                    <Link className="btn btn-addprofessor" to={`/AddEmployee`}><p>+ Profesor</p></Link>
                    <form className="search-bar" onSubmit={submitForm}>
                        <input
                            type="text"
                            placeholder="Search..."
                            
                            onChange={e => submitForm(e.target)} />
                    </form>

                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <HeaderTable columns={columns} sorting={sorting} sortTable={sortTable} sortFunction={sortFunction} />
                            <th><button className="btn btn-delete" onClick={buttonHandler}>Delete</button></th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            a[0].map((elem) => (
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

export default EmployeeHandler