import HeaderCell from "./HeaderCell"
import { useState } from "react"

const HeaderTable = ({ columns, sorting, sortTable,A,setA}) => {
    
  
  
    
        return (
            <>
                {columns.map((column) => (

                    <HeaderCell A={A} setA={setA} column={column} sorting={sorting} key={column} sortTable={sortTable}/>
                    ))}
            </>




        )
    }

export default HeaderTable

