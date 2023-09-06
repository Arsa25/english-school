import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../api'
import KindergartensContext from './ContextKinder'

const MyProviderKinder = ({ children }) => {
    const [refreshKindergartensData, setRefreshKindergartensData] = useState("false")
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
        if (refreshKindergartensData === "false") {
            fetchKindergartens()
            setRefreshKindergartensData("true")
        }
    },[refreshKindergartensData])

    return (
        <KindergartensContext.Provider value={{kindergartens, setKindergartens,refreshKindergartensData, setRefreshKindergartensData}}>{children}</KindergartensContext.Provider>
    )
}

export default MyProviderKinder