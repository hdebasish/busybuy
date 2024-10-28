import { NavLink, Outlet, useNavigate } from "react-router-dom"
import styles from "./navbar.module.css"
import { useDispatch, useSelector } from "react-redux";
import { userSelector, userActions } from "../../redux/reducers/authReducer";
import { logout } from "../../redux/reducers/authReducer";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GridLoader } from "react-spinners";



export default function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, user } = useSelector(userSelector);

    const handleLogout = async () => {
        try {
            dispatch(logout());
            dispatch(userActions.resetUser());
            navigate('/signin');
        } catch (error) {
            toast.error("Error logging out", {
                position: "top-center"
            });
        }
    }

    const navbarStyle = {
        color: "#1fe0ff",
    }

    if (user) {
        return (
            <div className={styles.container}>
                <nav className={styles.navbar}>
                    <div className={styles.logo}>
                        <NavLink to="/"><span className={styles.logoColor}>Busy</span>Buy</NavLink>
                    </div>
                    <ul>
                        <li><NavLink style={({ isActive }) => (isActive ? navbarStyle : undefined)} to="/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                        </svg> Home</NavLink></li>
                        <li><NavLink style={({ isActive }) => (isActive ? navbarStyle : undefined)} to="/cart"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                        </svg> Cart</NavLink></li>
                        <li><NavLink style={({ isActive }) => (isActive ? navbarStyle : undefined)} to="/orders"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-seam-fill" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003zM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461z" />
                        </svg> Orders</NavLink></li>
                        <li onClick={handleLogout} className={styles.logout}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                        </svg> Logout</li>
                    </ul>
                </nav>
                {loading ? <div className="loaderWrapper">
                    <GridLoader color="#6f2cf7" />
                </div> : <Outlet />}
                <ToastContainer />
            </div>
        )

    } else {
        return (
            <div className={styles.container}>
                <nav className={styles.navbar}>
                    <div className={styles.logo}>
                        <NavLink to="/"><span className={styles.logoColor}>Busy</span>Buy</NavLink>
                    </div>
                    <ul>
                        <li><NavLink style={({ isActive }) => (isActive ? navbarStyle : undefined)} to="/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                        </svg> Home</NavLink></li>
                        <li><NavLink style={({ isActive }) => (isActive ? navbarStyle : undefined)} to="/signin"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z" />
                            <path fillRule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                        </svg> Sign In</NavLink></li>
                    </ul>
                </nav>
                {loading ? <div className="loaderWrapper">
                    <GridLoader color="#6f2cf7" />
                </div> : <Outlet />}
                <ToastContainer />
            </div>
        )
    }


}