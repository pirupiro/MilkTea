import React, { useReducer } from "react";
import axios from "axios";
import AdminContext from "./AdminContext";
import AdminReducer from "./AdminReducer";
import { url } from "../../routers/Networking";

import {
	GET_ADMIN,
	CREATE_ADMIN,
	UPDATE_PASSWORD,
	DELETE_ADMIN,
	LOGIN_SUCCESS,
	LOGIN_FAIL
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

export const AdminState = props => {
	const [state, dispatch] = useReducer(AdminReducer, {
		admins: []
	});

	const loginAdmin = async (data ) => {
		try {
			const res = await axios.post(url + "/admins/login", data, config);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data.data
			});
		} catch (err) {
			alert(err);
		}
	};

	const getAdmin = async () => {
		try {
			const res = await axios.get(url + "/admins");

			dispatch({
				type: GET_ADMIN,
				payload: res.data.data
			});
		} catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.res.data.msg
      });
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
				configUrlLencode
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
