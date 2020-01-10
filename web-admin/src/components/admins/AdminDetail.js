import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import AdminContext from "../../contexts/admin/AdminContext";
import UpdateAdminForm from "../modalForms/admin/UpdateAdminForm";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		maxWidth: 752
	},
	demo: {
		backgroundColor: theme.palette.background.paper
	},
	title: {
		margin: theme.spacing(4, 0, 2)
	},
	rootForm: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: 200
		}
	},
	input: {
		display: "none"
	}
}));

export default function AdminDetail({ admin }) {
	//prep state
	const adminContext = useContext(AdminContext);
	const { deleteAdmin, updatePassword } = adminContext;
	// const [password, setPassword] = useState({});
	const [data, setData] = useState({		
		password: ""
	});	

	//prep component
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onDelete = () => {
		deleteAdmin(admin._id);
	};

	const handleSubmit = e => {
		e.preventDefault();
		updatePassword(admin._id, data);
		setOpen(false);
		// then(console.log(res));
	};

	const onChange = e =>
		setData({ ...admin, [e.target.name]: e.target.value });

	return (
		<div>
			<div>
				<ListItem
					button
					fullwidth='true'
					onClick={handleClickOpen}
					key="admin._id"
				>
					<ListItemText primary={admin.username} />
					<ListItemSecondaryAction>
						<IconButton
							edge="end"
							aria-label="delete"
							onClick={onDelete}
						>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			</div>

			{/* define dialog box */}
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
					onSubmit={handleSubmit}
					className={classes.root}
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

			{/* <div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{"Confirmation!"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you want to delete this item
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Disagree
						</Button>
						<Button onClick={handleClose} color="primary" autoFocus>
							Agree
						</Button>
					</DialogActions>
				</Dialog>
			</div> */}

		</div>
	);
}
