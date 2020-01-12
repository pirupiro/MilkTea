import React, { useReducer } from "react";
import axios from "axios";
import ItemContext from "./ItemContext";
import ItemReducer from "./ItemReducer";
import {
	CREATE_ITEM,
	GET_ITEM,
	DELETE_ITEM,
	UPDATE_ITEM
} from "../DispatchType";

import { url } from "../../routers/Networking";

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

export const ItemState = props => {
	const [state, dispatch] = useReducer(ItemReducer, {
		items: []
	});

	const getItem = async () => {
		try {
			const res = await axios.get(url + "/items");

			dispatch({
				type: GET_ITEM,
				payload: res.data.data
			});
		} catch (err) {
			console.log(err);
		}
	};

	// add item
	const addItem = async item => {
		try {
			const res = await axios.post(
				url + "/items",
				item,
				// config
				{
					headers: {
						"content-type": "multipart/form-data"
					}
				}
			);
			dispatch({
				type: CREATE_ITEM,
				payload: res.data.data
			});
		} catch (err) {
			console.log(err);
		}
	};

	//update
	const updateItem = async (id, item) => {
		try {
			const res = await axios.put(url + `/items/${id}`, item, config);
			const data = res.data;

			if (data.error) {
				alert(data.message);
			} else {
				dispatch({
					type: UPDATE_ITEM,
					payload: res.data.data
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	const deleteItem = async id => {
		try {
			await axios.delete(url + `/items/${id}`);

			dispatch({
				type: DELETE_ITEM,
				payload: id
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ItemContext.Provider
			value={{
				items: state.items,
				addItem,
				deleteItem,
				updateItem,
				getItem
			}}
		>
			{props.children}
		</ItemContext.Provider>
	);
};

export default ItemState;
