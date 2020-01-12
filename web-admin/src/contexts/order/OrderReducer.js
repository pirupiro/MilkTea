import {
	GET_ORDER_BY_ID,
	UPDATE_ORDER_STAT,
	GET_ORDER_BY_STAT
} from "../DispatchType";

export default (state, action) => {
	switch (action.type) {
		case GET_ORDER_BY_ID:
			return {
				...state,
				orders: action.payload
			};
		case GET_ORDER_BY_STAT:
			return {
				...state,
				orders: action.payload
			};
		case UPDATE_ORDER_STAT:
			return {
				...state,
				orders: state.orders.map(order =>
					order._id === action.payload._id ? action.payload : order
				)
			};

		default:
			return state;
	}
};
