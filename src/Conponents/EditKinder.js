import { useState, useEffect, useContext,useRef } from "react"
import axios from "axios"
import { API_URL } from "../api"


const ModalEdit = ({ id }) => {
    const modalRef = useRef(null);
    // const employeeContext = useContext(EmployeeContext)

    const [kinder, setKinder] = useState({ name: "", code: "", address: { city: "", cityhall: "", street: "" }, phone: "", email: "", manager: "" })


    const fetchKinder = async () => {

        try {
            const kinder = await axios.get(`${API_URL}/kindergartens/${id}`)
            setKinder(kinder.data)

        } catch (err) {
            console.log(err.message);
        }
    }
    useEffect(() => {
        fetchKinder()
    }, [id])


    const handleChange = (e) => {
        e.preventDefault()

        if (kinder.name !== "" &&
            kinder.code !== "" &&
            kinder.address.city !== "" &&
            kinder.address.cityhall !== "" &&
            kinder.address.street !== "" &&
            kinder.phone !== "" &&
            kinder.email !== "" &&
            kinder.manager !== "") {
            const updateKinder = axios.put(`${API_URL}/kindergartens/${id}`, kinder, { 'Content-Type': 'application/json' })
            alert("Vrtic je azuriran!")
            onClose()
        }
    }

    const onClose = () => {
        const modal = document.querySelector(".btn-edit").nextSibling
        modal.style.display = "none"
    }

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setKinder((prevKinder) => ({
            ...prevKinder,
            address: {
                ...prevKinder.address,
                [name]: value,
            },
        }));
    };

    return (
        <>
                <button onClick={() => modalRef.current.style.display = "block"} className="btn btn-edit">
                    EDIT
                </button>

                <div ref={modalRef} className="modal-content-edit">
                    <form  id="addProfesora" onSubmit={handleChange}>
                        <input type="text" placeholder="Unesite ime vrtica" className="input input-ime" required={true} value={kinder.name} onChange={(e) => setKinder({ ...kinder, name: e.target.value })} />
                        <input type="text" placeholder="Unesite sifru placanja" className="input input-prezime" required={true} value={kinder.code} onChange={(e) => setKinder({ ...kinder, code: e.target.value })} />

                        <input type="text" placeholder="Unesite ime ulice" name="street" className="input input-adrtesa" required={true} value={kinder.address.city} onChange={handleAddressChange} />
                        <input type="text" placeholder="Unesite ime opstine" name="cityhall" className="input input-adrtesa" required={true} value={kinder.address.cityhall} onChange={handleAddressChange} />
                        <input type="text" placeholder="Unesite ime grada" name="city" className="input input-adrtesa" required={true} value={kinder.address.street} onChange={handleAddressChange} />

                        <input type="text" placeholder="Unesite phone" className="input input-phone" required={true} value={kinder.phone} onChange={(e) => setKinder({ ...kinder, phone: e.target.value })} />
                        <input type="email" placeholder="Unesite email" className="input input-email" required={true} value={kinder.email} onChange={(e) => setKinder({ ...kinder, email: e.target.value })} />
                        <input type="text" placeholder="Unesite ime menadzera" className="input input-vrtic" required={true} value={kinder.manager} onChange={(e) => setKinder({ ...kinder, manager: e.target.value })} />
                        <input className="submitProfesora" type="submit" />
                    </form>

                    <button className="btn-delete" onClick={() => modalRef.current.style.display = "none"}>
                        Zatvori
                    </button>

                </div>
        </>
    )
}
export default ModalEdit