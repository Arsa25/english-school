import { useState, useEffect, useContext } from "react";
import axios, { Axios } from "axios";
import { API_URL } from "../api";
import EmployeeContext from "../Context/Context";
import HeaderCell from "./HeaderCell";





const HeaderTable = ({ columns, sorting, sortTable,sortFunction }) => {

    return (
        <>
            {columns.map((column) => (

                <HeaderCell column={column} sorting={sorting} key={column} sortTable={sortTable} sortFunction = {sortFunction}/>
            ))}
        </>




    )
}
export default HeaderTable

