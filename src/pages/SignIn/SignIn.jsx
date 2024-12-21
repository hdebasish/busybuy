import { Link, useNavigate } from "react-router-dom";
import styles from "./signin.module.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { GridLoader } from "react-spinners";
import { signInUser, userSelector } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/reducers/authReducer";

export default function SignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector(userSelector);

    useEffect(() => {
        if (user) {
            navigate('/');
        }

        if (error) {
            toast.error(error, {
                position: "top-center",
            });
            dispatch(userActions.setError(null));
        }

    }, [user, error, navigate, dispatch]);


    if (loading) {
        return <div className="loaderWrapper">
            <GridLoader color="#6f2cf7" />
        </div>;
    }



    const handleFormSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        const currentUser = {
            email,
            password
        }

        try {
            dispatch(signInUser(currentUser));
        } catch (error) {
            console.log(error);
        }

        e.target.reset();
    }


    return (<div className={styles.signinWrapper}>
        <div className={styles.signinContainer}>
            <div className="heading">Sign In</div>
            <form onSubmit={handleFormSubmit}>
                <div className={styles.inputContainer}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter Your Email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter Your Password" name="password" />
                    </div>
                    <button type="submit">Sign In</button>
                </div>
            </form>
            <div className={styles.signUpLink}>
                Don't have an account? <Link to="/signup" style={{ textDecoration: 'none' }}>Sign Up</Link>
            </div>

        </div>
    </div>);
}