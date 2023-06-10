import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser } from "@fortawesome/free-solid-svg-icons"
import {
    MDBBtn,
    MDBIcon,
    MDBSpinner
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { googleSignIn, login } from "../redux/features/authSlice";
import { GoogleLogin } from "@leecheuk/react-google-login";

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
        error && toast.error(error);
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

    const googleSuccess = (resp) => {
        const email = resp?.profileObj?.email;
        const name = resp?.profileObj?.name;
        const token = resp?.tokenId;
        const googleId = resp?.googleId;
        const result = { email, name, token, googleId };
        dispatch(googleSignIn({ result, navigate, toast }));
    };
    const googleFailure = (error) => {
        toast.error(error);
    };
    return (
        <div className="containerSign">
            <div className="containerSign_second">
                <div>
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
                        {loading && (
                            <MDBSpinner

                                size="sm"
                                role="status"
                                tag="span"
                                className="me-2"
                            />
                        )}
                        LOGIN
                    </button>

                </form>
                <br />
                <GoogleLogin
                    clientId="your client id"
                    render={(renderProps) => (
                        <MDBBtn
                            style={{
                                padding: "0 40px",
                                fontSize: "1.4rem",
                                border: "none",
                                color: "#0275d8",


                            }}
                            color="danger"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                        >
                            <MDBIcon className="me-2" fab icon="google" /> Google Sign In
                        </MDBBtn>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                />
                <div className="col-12">
                </div>
                <Link to={`/SignUp`}><p>Don't have an account ? Sign Up</p></Link>
            </div>
        </div>
    )
}
export default Login