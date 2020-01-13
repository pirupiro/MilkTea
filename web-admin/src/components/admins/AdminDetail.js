import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import AdminContext from "../../contexts/admin/AdminContext";
import UpdateAdminForm from "../modalForms/admin/UpdateAdminForm";

export default function AdminDetail({ admin }) {
	//prep state
	const adminContext = useContext(AdminContext);
	const { deleteAdmin, updatePassword } = adminContext;

	//prep component
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [openDelete, setOpenDelete] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpenDelete = () => {
		setOpenDelete(true);
	};

	const handleCloseDelete = () => {
		setOpenDelete(false);
	};

	const onDelete = () => {
		deleteAdmin(admin._id);
		handleCloseDelete();
	};

	return (
		<div>
			<div>
				<ListItem
					button
					fullwidth="true"
					onClick={handleOpen}
					key={admin._id}
				>
					<ListItemText primary={admin.username} />
					<ListItemSecondaryAction>
						<IconButton
							edge="end"
							aria-label="delete"
							onClick={handleOpenDelete}
						>
							<DeleteIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			</div>

			<UpdateAdminForm props={open} setProps={setOpen} admin={admin} />

			<div>
				<Dialog
					open={openDelete}
					onClose={handleCloseDelete}
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
						<Button onClick={handleCloseDelete} color="primary">
							Disagree
						</Button>
						<Button onClick={onDelete} color="primary" autoFocus>
							Agree
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
}
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
