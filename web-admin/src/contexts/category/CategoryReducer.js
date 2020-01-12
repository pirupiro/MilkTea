import {
  GET_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY
} from "../DispatchType";

export default (state, action) => {
  switch (action.type) {
		case GET_CATEGORY:
			return {
				...state,
				categories: action.payload
			};
		case CREATE_CATEGORY:
			return {
				...state,
        		categories: [action.payload, ...state.categories],
			};
			case UPDATE_CATEGORY:
				return {
					...state,
					categories: state.categories.map(category =>
						category._id === action.payload._id ? action.payload : category
					)

				};
			default:
				return state;
		}
	};
