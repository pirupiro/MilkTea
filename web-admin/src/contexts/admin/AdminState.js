import React, { useReducer } from "react";
import axios from "axios";
import AdminContext from "./AdminContext";
import AdminReducer from "./AdminReducer";
import { url } from "../../routers/Networking";

import {
	GET_ADMIN,
	CREATE_ADMIN,
	UPDATE_PASSWORD,
	DELETE_ADMIN
} from "../DispatchType";

const config = {
	headers: {
		"Content-Type": "application/json"
	}
};

export const AdminState = props => {
	const [state, dispatch] = useReducer(AdminReducer, {
		admins: []
	});

	const getAdmin = async () => {
		try {
			const res = await axios.get(url + "/admins");

			dispatch({
				type: GET_ADMIN,
				payload: res.data.data
			});
		} catch (err) {
			alert(err);
		}
	};

	const addAdmin = async admin => {
		try {
			const res = await axios.post(url + "/admins", admin, config);
			dispatch({
				type: CREATE_ADMIN,
				payload: res.data.data
			});
		} catch (err) {
			alert(err);
		}
	};

	const updatePassword = async (id, data) => {
		try {
			const res = await axios.put(url + `/admins/${id}`, 
				data, 
				// config
			);

			dispatch({
				type: UPDATE_PASSWORD,
				payload: res.data.data
			});
		} catch (err) {
			alert(err);
		}
	};

	const deleteAdmin = async id => {
		try {
			await axios.delete(url + `/admins/${id}`);

			dispatch({
				type: DELETE_ADMIN,
				payload: id
			});
		} catch (err) {
			alert(err);
		}
	};

	return (
		<AdminContext.Provider
			value={{
				admins: state.admins,
				addAdmin,
				deleteAdmin,
				updatePassword,
				getAdmin
			}}
		>
			{props.children}
		</AdminContext.Provider>
	);
};

export default AdminState;
