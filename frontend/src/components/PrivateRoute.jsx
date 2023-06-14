import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";



const PrivateRoute = () => {
    //getting userInfo from redux store to check if user is logged in or not
    const {userInfo} = useSelector((state) =>state.auth);
    //  if user is logged in then show the component else redirect to login screen with replace so that user can't come back to this screen by pressing back button
    return userInfo ? <Outlet /> : <Navigate to="/login" replace/>;


}

export default PrivateRoute