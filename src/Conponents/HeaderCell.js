import { FaArrowCircleUp } from 'react-icons/fa';
import { FaArrowCircleDown } from 'react-icons/fa';

const HeaderCell = ({ column, sorting, sortTable,sortFunction }) => {
    const isAscSorting = sorting.column === column && sorting.order === "asc";
    const isDescSorting = sorting.column === column && sorting.order === "desc";
    const futureSortingOrder = isDescSorting ? "asc" : "desc"
    return (
        <th key={column} onClick={() => sortTable({ column, order: futureSortingOrder })}>
            {column}
            {isAscSorting && <span> <FaArrowCircleUp /></span>}
            {isDescSorting && <span> <FaArrowCircleDown /></span>}
        </th>
    )
}
export default HeaderCell