import {
	CREATE_ITEM,
	GET_ITEM,
	DELETE_ITEM,
	UPDATE_ITEM
} from "../DispatchType";

export default (state, action) => {
	switch (action.type) {
		case GET_ITEM:
			return {
				...state,
				items: action.payload
			};
		case CREATE_ITEM:
			// return [
			// 	...state,
			// 	{
			// 		items: action.payload
			// 	}
			// ];
			return {
				...state,
        items: [action.payload, ...state.items],
			};
		case UPDATE_ITEM:
			return {
				...state,
				items: state.items.map(item =>
					item._id === action.payload._id ? action.payload : item
				)
				
			};
		case DELETE_ITEM:
			return {
				...state,
				items: state.items.filter(item => item._id !== action.payload)
				
			};
		
		default:
			return state;
	}
};
