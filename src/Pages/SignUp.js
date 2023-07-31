import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import {
    MDBSpinner,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { register } from "../redux/features/authSlice";
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
};

const Register = () => {

    const [formValue, setFormValue] = useState(initialState);
    const { loading, error } = useSelector((state) => ({ ...state.auth }));
    const { email, password, firstName, lastName, confirmPassword } = formValue;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        error && toast.error(error);
    }, [error]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Password should match");
        }
        if (email && password && firstName && lastName && confirmPassword) {
            dispatch(register({ formValue, navigate, toast }));
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
                <div>
                    <FontAwesomeIcon icon={faCircleUser} size="3x" color="#0275d8" />
                    <h2>Sign Up</h2>
                </div>

                <form id="form_signup" onSubmit={handleSubmit}>
                    <div>
                        <input
                        placeholder="first name"
                            type="text"
                            value={firstName}
                            name="firstName"
                            onChange={onInputChange}
                            required
                            invalid = "true"
                            validation="Please provide first name"
                            className="signup_name"
                        />
                        <input
                        placeholder="last name"
                            type="text"
                            value={lastName}
                            name="lastName"
                            onChange={onInputChange}
                            required
                            invalid = "true"
                            validation="Please provide last name"
                            className="signup_lastName"
                        />
                    </div>
                    <input
                    placeholder="email"
                        type="email"
                        value={email}
                        name="email"
                        onChange={onInputChange}
                        required
                        invalid = "true"
                        validation="Please provide email"
                        className="inputlog input-email"
                    />
                    <input
                    placeholder="password"
                        type="password"
                        value={password}
                        name="password"
                        onChange={onInputChange}
                        required
                        invalid = "true"
                        validation="Please provide password"
                        className="inputlog input-password"
                    />

                    <input
                    placeholder="confirm password"
                        type="password"
                        value={confirmPassword}
                        name="confirmPassword"
                        onChange={onInputChange}
                        required
                        invalid = "true"
                        validation="Please provide confirm password"
                        className="inputlog input-password"
                    />
                    <div>
                    <button className="inputlog_register" type="submit">
                        {loading && (
                            <MDBSpinner
                                size="sm"
                                role="status"
                                tag="span"
                                className="me-2"
                            />
                        )}
                        Register
                    </button>
                    </div>
                </form>
                <Link to={`/`}><p>Already have an account ? Sign In</p></Link>
            </div>
        </div>
    )

}
export default Register

