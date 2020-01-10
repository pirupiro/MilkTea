import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../DispatchType";

export default (state, action) => {
	switch (action.type) {		
		case LOGIN_SUCCESS:
			// localStorage.setItem("token", action.payload.token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true
			};
		case LOGIN_FAIL:
		case LOGOUT:
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
