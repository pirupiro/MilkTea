import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import { url } from "../../routers/Networking";
// import setAuthToken from "../../utils/setAuthToken";
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from "../DispatchType";

const config = {
	headers: {
		"Content-Type": "application/json"
	}
};

const AuthState = props => {

	const [state, dispatch] = useReducer(AuthReducer, {
		token: null,
		isAuthenticated: false,
		error: null
  });

	// Login User
	const login = async formData => {
		try {
			const res = await axios.post(url + "/admins/login", formData, config);
			const data = res.data;

			if (data.error) {
				alert(data.message);
			} else {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res.data.data
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	// Logout
	const logout = () => dispatch({ type: LOGOUT });
	console.log(state.isAuthenticated);
	console.log(state.token);
	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				login,
				logout
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;

