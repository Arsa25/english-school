// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from './Pages/SignInn';
import SignUp from './Pages/SignUp';
import Home from './Pages/Home';
import Employee from './Pages/Employee';
import AddEmployee from './Pages/AddEmployee';
import EditEmployee from './Pages/EditEmployee';


function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<SignIn></SignIn>}></Route>
        <Route path={"/signup"} element={<SignUp></SignUp>}></Route>
        <Route path={"/home"} element={<Home></Home>}></Route>
        <Route path={"/employee"} element={<Employee></Employee>}></Route>
        <Route path={"/addEmployee"} element={<AddEmployee></AddEmployee>}></Route>
        <Route path={"/editEmployee/:id"} element={<EditEmployee></EditEmployee>}></Route>
        {/* <Route path={"/create"} element={<AddCityhall></AddCityhall>}></Route> */}
        {/* <Route path={"/edit"} element={<AddKindergartens></AddKindergartens>}></Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;
