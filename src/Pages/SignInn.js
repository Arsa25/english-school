import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { login } from "../redux/features/authSlice";


const initialState = {
    email: "",
    password: "",
};

const Login = () => {
    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const { email, password } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error &&  toast.error(error)
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login({ formValue, navigate, toast }));
        }
    };
    const onInputChange = (e) => {
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
    };
    
    
    return (
        <div className="containerSign">
            <ToastContainer/>
            <div className="containerSign_second">
                <div className="icon-div">
                    <FontAwesomeIcon icon={faCircleUser} size="3x" color="#0275d8" />
                    <h2>Sign In</h2>
                </div>

                <form onSubmit={handleSubmit} id="form_signup" >
                    <label htmlFor="email">Email</label>
                    <input
                    id="email"
                        type="email"
                        value={email}
                        name="email"
                        onChange={onInputChange}
                        required
                        invalid = "true"
                        className="inputlog"
                        validation="Please provide your email"
                    />

                    <label htmlFor="">Password</label>
                    <input
                        type="password"
                        value={password}
                        name="password"
                        onChange={onInputChange}
                        required
                        invalid = "true"
                        validation="Please provide your password"
                        className="inputlog input-password"

                    />
                    <button className="inputlog_register" type="submit">                        
                        LOGIN
                    </button>

                </form>
                <br />
                
                <div className="col-12">
                </div>
                <Link to={`/SignUp`}><p>Don't have an account ? Sign Up</p></Link>
               
            </div>
        </div>
    )
}
export default Login