import {
	GET_ADMIN,
	CREATE_ADMIN,
	UPDATE_PASSWORD,
	DELETE_ADMIN
} from "../DispatchType";

export default (state, action) => {
	switch (action.type) {
		case GET_ADMIN:
			return {
				...state,
				admins: action.payload
			};
		case CREATE_ADMIN:		
			return {
				...state,
        admins: [action.payload, ...state.admins],
			};
		case UPDATE_PASSWORD:
			return {
				...state,
				admins: state.admins.map(item =>
					item._id === action.payload._id ? action.payload : item
				)
			};
		case DELETE_ADMIN:
			return {
				...state,
				admins: state.admins.filter(
					item => item._id !== action.payload
				)
			};

		default:
			return state;
	}
};
