import { Link, useNavigate } from "react-router-dom";
import styles from "./signup.module.css"
import { useEffect } from "react";
import { userSelector } from "../../redux/reducers/authReducer";
import { signUpUser } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { GridLoader } from "react-spinners";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userActions } from "../../redux/reducers/authReducer";

export default function SignUp() {

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

        const newUser = {
            email,
            password
        }

        try {
            dispatch(signUpUser(newUser));
        } catch (error) {
            console.log(error);
        }

        e.target.reset();
    }


    return (<div className={styles.signupWrapper}>
        <div className={styles.signupContainer}>
            <div className="heading">Sign Up</div>
            <form onSubmit={handleFormSubmit}>
                <div className={styles.inputContainer}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter Your Name" name="name" />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter Your Email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter Your Password" name="password" />
                    </div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <div className={styles.signInLink}>
                Already have an account? <Link to="/signin" style={{ textDecoration: 'none' }}>Sign In</Link>
            </div>
        </div>
    </div>);
}