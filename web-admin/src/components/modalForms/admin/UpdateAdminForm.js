import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

import AdminContext from "../../../contexts/admin/AdminContext";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		maxWidth: 752
	},
	rootForm: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: 200
		}
	},
}));

export default function UpdateAdminForm({ props, setProps, admin }) {
	//set state
	const adminContext = useContext(AdminContext);

	const { updatePassword } = adminContext;

	const [data, setData] = useState({		
		password: ""
	});	

	// set component
	// const [props, setProps] = React.useState(false);fclass
	const classes = useStyles();

	const handleClickOpen = () => {
		setProps(true);
	};

	const handleClose = () => {
		setProps(false);
	};

	const onChange = e =>
		setData({ ...admin, [e.target.name]: e.target.value });

	const handleSubmit = e => {
		e.preventDefault();
		updatePassword(admin._id, data);
		setProps(false);
	};

	return (
		<div>
			<Dialog
				open={props}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				onSubmit={handleSubmit}
				className={classes.rootForm}
			>
				<DialogTitle id="form-dialog-title">Admin Form</DialogTitle>
				<DialogContent>
					<DialogContentText>Create new Admin</DialogContentText>
					<TextField
						id="outlined-textarea"
						label="Name"
						defaultValue={admin.username}
						multiline
						variant="outlined"
						InputProps={{
							readOnly: true
						}}
					/>

					<TextField
						id="outlined-textarea"
						label="Old password"
						multiline
						variant="outlined"
						value={admin.password}
					/>

					<TextField
						id="outlined-textarea"
						label="New password"
						multiline
						variant="outlined"
						onChange={onChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button
						color="primary"
						type="submit"
						value="addAdmin"
						onClick={handleSubmit}
					>
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
