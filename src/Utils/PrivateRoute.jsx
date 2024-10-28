
import { GridLoader } from "react-spinners";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/reducers/authReducer";

export default function PrivateRoute ({children}){

    const { loading, user } = useSelector(userSelector);


    if(loading) {
        return <GridLoader color="#6f2cf7" />;
    }

    if(user){
        return children;
    }

    return <Navigate to="/signin" />;

}