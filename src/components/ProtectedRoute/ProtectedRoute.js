import { Navigate, useLocation } from "react-router-dom";


const ProtectedRouteElement = ({ element: Component, ...props }) => {

	const location = useLocation()

	return (
		props.loggedIn ? <Component {...props} /> : <Navigate to={"/"} replace />
	)
}

export default ProtectedRouteElement;