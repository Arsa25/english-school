import { FaArrowCircleUp } from 'react-icons/fa';
import { FaArrowCircleDown } from 'react-icons/fa';
import React from 'react';
import { useState } from 'react';

const HeaderCell = ({ column, sorting,sortTable, A,setA}) => {


    const sortingOrder = sorting.order
    const sortingColumn = sorting.column
    
    const handleSort = (sortOrder) => {
        const column = sortOrder.column
        const order = sortOrder.futureSortingOrder
        sortFunction({order,column});
        sortTable({column:column,order:order});
    }

//sort funkcija
const sortFunction = ({order,column}) => {
try {
    const sortedArray = [...A];
    if (order === "asc") {
        sortedArray.sort((a, b) => {
            const nameA = a[column].toUpperCase();
            const nameB = b[column].toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        })
    } else {
        sortedArray.sort((a, b) => {
            const nameA = a[column].toUpperCase();
            const nameB = b[column].toUpperCase();
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



    const isAscSorting = sortingColumn === column && sortingOrder === "asc";
    const isDescSorting = sortingColumn === column && sortingOrder === "desc";
    const futureSortingOrder = isDescSorting ? "asc" : "desc"

    return (
        <th key={column} onClick={() => handleSort({ column,futureSortingOrder })}>
            {column}
            {isAscSorting && <span> <FaArrowCircleUp/></span>}
            {isDescSorting && <span> <FaArrowCircleDown /></span>}
        </th>
    )
}
export default HeaderCell