import EmployeeHeader from "../Conponents/Employee_components/EmployeeHeader";
import { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { API_URL } from "../api";
import KindergartensContext from "../Context/ContextKinder";
import Modal from "../Conponents/CreateKinder";
import ModalEdit from "../Conponents/EditKinder";
import EmployeeContext from "../Context/Context";

const Kindergartens = () => {

    const kinderContext = useContext(KindergartensContext)
    const kindergartens = useMemo(() => kinderContext.kindergartens, [kinderContext.kindergartens]);
    const [kindergartensState, setKindergartensState] = useState(kindergartens)
    const employeeContext = useContext(EmployeeContext)

    useEffect(() => {
        setKindergartensState(kindergartens);
    }, [kindergartens]);

    //employeechack
    const employeechack = (kName) => {
        const kinderName = kName.toUpperCase()
        const employee = employeeContext.employee
        let fullName = ""

        employee.forEach((elem) => {
            let kinderNameContext = elem.vrtic.toUpperCase()

            if (kinderNameContext === kinderName) {
                fullName = elem.ime + " " + elem.prezime
                return;
            }

        })
        return fullName
    }

    const deleteF = async (id) => {
        try {
            if (window.confirm("Da li ste sigurni")) {
                axios.delete(`${API_URL}/kindergartens/${id}`)
                var filtriraj = kindergartensState.filter((elem) => elem._id !== id)
                setKindergartensState(filtriraj)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <EmployeeHeader />
            <Modal />
            <div className="kinder_container">
                {
                    kindergartensState.map((elem) => (

                        <div className="kinder_fascikla" key={elem._id}>
                            <h2>{elem.name}</h2>
                            <p>menadzer: {elem.manager}</p>
                            <p>sifra placanja: {elem.code}</p>
                            <p>adresa: {elem.address.street} / {elem.address.city} / {elem.address.cityhall}</p>
                            <p>kontakt: {elem.email} / {elem.phone} </p>
                            <p>profesor: {employeechack(elem.name)}</p>

                            <button value={elem._id} className="btn btn-delete" onClick={(e) => deleteF(e.target.value)}>Delete</button>
                            <ModalEdit key={elem._id} id={elem._id} />
                            {/* <button className="btn btn-primary" onClick={}>Edit</button> */}
                        </div>


                    ))
                }
            </div>
            <footer className="footer"></footer>
        </>

    )
}


export default Kindergartens