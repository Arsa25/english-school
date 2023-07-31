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

