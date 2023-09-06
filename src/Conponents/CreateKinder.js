import { useState, useContext } from "react"
import axios from "axios"
import { API_URL } from "../api"
import KindergartensContext from "../Context/ContextKinder"

const Modal = () => {

    const { setRefreshKindergartensData } = useContext(KindergartensContext);
    const [kinder, setKinder] = useState({ name: "", code: "", address: { city: "", cityhall: "", street: "" }, phone: "", email: "", manager: "" })

    const createKinder = async (data) => {
        try {
            await axios.post(`${API_URL}/kindergartens`, data)
            
        } catch (err) {
            console.log(err);
        }
    }
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
            createKinder(kinder)
            setRefreshKindergartensData("false")
            alert("Vrtic je kreiran!")
            onClose()
        }
    }
    const onOpen = () => {
        const modal = document.querySelector(".modal-content")
        const kinderContainer = document.querySelector(".kinder_container")
        modal.style.display = "block"
        kinderContainer.style.filter = "blur(5px)"

    }
    const onClose = () => {
        const modal = document.querySelector(".modal-content")
        const kinderContainer = document.querySelector(".kinder_container")
        modal.style.display = "none"
        kinderContainer.style.filter = "blur(0px)"
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
            <button onClick={onOpen} className="btn_create_kinder">
                +
            </button>
            <div className="modal-content">

                <form id="addProfesora" onSubmit={handleChange}>
                    <input type="text" placeholder="Unesite ime vrtica" className="input input-ime" required={true} onChange={(e) => setKinder({ ...kinder, name: e.target.value })} />
                    <input type="text" placeholder="Unesite sifru placanja" className="input input-prezime" required={true} onChange={(e) => setKinder({ ...kinder, code: e.target.value })} />

                    <input type="text" placeholder="Unesite ime ulice" name="street" className="input input-adrtesa" required={true} onChange={handleAddressChange} />
                    <input type="text" placeholder="Unesite ime opstine"name="cityhall" className="input input-adrtesa" required={true} onChange={handleAddressChange} />
                    <input type="text" placeholder="Unesite ime grada"name="city" className="input input-adrtesa" required={true} onChange={handleAddressChange} />

                    <input type="text" placeholder="Unesite phone" className="input input-phone" required={true} onChange={(e) => setKinder({ ...kinder, phone: e.target.value })} />
                    <input type="email" placeholder="Unesite email" className="input input-email" required={true} onChange={(e) => setKinder({ ...kinder, email: e.target.value })} />
                    <input type="text" placeholder="Unesite ime menadzera" className="input input-vrtic" required={true} onChange={(e) => setKinder({ ...kinder, manager: e.target.value })} />
                    <input className="submitProfesora" type="submit" />
                </form>

                <button className="btn-delete" onClick={onClose}>
                    Zatvori
                </button>

            </div>

        </>
    );
}

export default Modal;
