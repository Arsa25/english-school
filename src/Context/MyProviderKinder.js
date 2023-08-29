import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../api'
import KindergartensContext from './ContextKinder'

const MyProviderKinder = ({ children }) => {

    const [kindergartens,setKindergartens] = useState([])

    const fetchKindergartens = async () => {
        try {
            const kindergartens = await axios.get(`${API_URL}/kindergartens`)
            setKindergartens(kindergartens.data)
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchKindergartens()
    },[])

    return (
        <KindergartensContext.Provider value={{kindergartens, setKindergartens}}>{children}</KindergartensContext.Provider>
    )
}

export default MyProviderKinder