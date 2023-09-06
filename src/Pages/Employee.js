import EmployeeHeader from "../Conponents/Employee_components/EmployeeHeader"
import EmployeeTable from "../Conponents/Employee_components/EmployeeTable/EmployeeTable"

const Employee = () => {    

    return (
        <>
                <EmployeeHeader/>
                <EmployeeTable />
                <footer className="footer"></footer>
        </>
    )
}
export default Employee