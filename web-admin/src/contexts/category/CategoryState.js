import React, { useReducer } from "react";
import axios from "axios";

import CategoryContext from "./CategoryContext";
import CategoryReducer from "./CategoryReducer";
import { url } from "../../routers/Networking";

import {
	GET_CATEGORY,
	CREATE_CATEGORY,
	UPDATE_CATEGORY
} from "../DispatchType";

const config = {
	headers: {
		"Content-Type": "application/json"
	}
};

const configUrlLencode = {
	headers: {
		"content-type": "application/x-www-form-urlencoded;charset=utf-8"
	}
};

export const CategoryState = props => {
	const [state, dispatch] = useReducer(CategoryReducer, {
		categories: []
	});

	const getCategory = async () => {
		try {
			const res = await axios.get(url + "/categories");

			dispatch({
				type: GET_CATEGORY,
				payload: res.data.data
			});
		} catch (err) {
			alert(err);
		}
	};

	// add category
	const addCategory = async category => {
		try {
			const res = await axios.post(url + "/categories", category, config);
			dispatch({
				type: CREATE_CATEGORY,
				payload: res.data.data
			});
		} catch (err) {
			alert(err);
		}
	};

	//update
	const updateCategory = async (id, name) => {
		try {
			const res = await axios.put(
				url + `/categories/${id}`,
				// url + '/categories',
				// {
				// 	params: {
				// 		id: id
				// 	}
				// },
				name,
				configUrlLencode
				// config
			);

			dispatch({
				type: UPDATE_CATEGORY,
				payload: res.data.data
			});
		} catch (err) {
			alert(err);
		}
	};

	return (
		<CategoryContext.Provider
			value={{
				categories: state.categories,
				addCategory,
				getCategory,
				updateCategory
			}}
		>
			{props.children}
		</CategoryContext.Provider>
	);
};

export default CategoryState;
