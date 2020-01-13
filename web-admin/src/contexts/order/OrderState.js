import React, { useReducer } from "react";

import OrderContext from "./OrderContext";
import OrderReducer from "./OrderReducer";
import axios from "axios";
import { url } from "../../routers/Networking";
import {
	GET_ORDER_BY_ID,
	GET_ORDER_BY_STAT,
	UPDATE_ORDER_STAT
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

export const OrderState = props => {
	const [state, dispatch] = useReducer(OrderReducer, {
		orders: []
	});

	const getOrderByID = async id => {
		try {
			const res = await axios.get(
				url + "/orders", // +`/${id}`
				{
					params: {
						id: id
					}
				},
				config
			);
			const data = res.data;

			if (data.error) {
				alert(data.message);
			} else {
				dispatch({
					type: GET_ORDER_BY_ID,
					payload: res.data.data
				});
			}
		}catch (err) {
			alert(err);
		}
	};

	const getOrderByStat = async stat => {
		try {
			const res = await axios.get(url + "/orders", {
				params: {
					status: stat
				}
			});

			dispatch({
				type: GET_ORDER_BY_STAT,
				payload: res.data.data
			});
		} catch (err) {
			alert(err);
		}
	};

	//update
	const updateOrder = async (id, order) => {
		try {
			const res = await axios.put(url + `/orders/${id}`, order, config);
			const data = res.data;

			if (data.error) {
				alert(data.message);
			} else {
				dispatch({
					type: UPDATE_ORDER_STAT,
					payload: res.data.data
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<OrderContext.Provider
			value={{
				orders: state.orders,
				updateOrder,
				getOrderByStat,
				getOrderByID
			}}
		>
			{props.children}
		</OrderContext.Provider>
	);
};

export default OrderState;
