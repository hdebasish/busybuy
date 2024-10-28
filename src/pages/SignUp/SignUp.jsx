import { Link, useNavigate } from "react-router-dom";
import styles from "./signup.module.css"
import { useEffect } from "react";
import { userSelector } from "../../redux/reducers/authReducer";
import { signUpUser } from "../../redux/reducers/authReducer";
import { useDispatch, useSelector } from "react-redux";
import { GridLoader } from "react-spinners";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, user } = useSelector(userSelector);


    useEffect(() => {
        if (user) {
            navigate('/');
        }

        if(error){
            toast.error(error, {
                position: "top-center",
            });
        }

    },[user, error, navigate]);


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
                    <input type="text" placeholder="Enter Your Name" name="name" />
                    <input type="email" placeholder="Enter Your Email" name="email" />
                    <input type="password" placeholder="Enter Your Password" name="password" />
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <div className={styles.signInLink}>
                Already have an account? <Link to="/signin">Sign In</Link>
            </div>
        </div>
    </div>);
}