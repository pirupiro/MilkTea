import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../DispatchType";
import setToken from "../../routers/setToken";

export default (state, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload,
				token: setToken(localStorage.token),
				isAuthenticated: true
			};
		case LOGIN_FAIL, LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
			};
		default:
			return state;
	}
};
