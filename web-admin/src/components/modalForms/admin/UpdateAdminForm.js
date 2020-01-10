import React, { useState, useContext, useEffect } from "react";
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

export default function CreateAdminForm() {
	//set state
	const adminContext = useContext(AdminContext);

	const { updatePassword } = adminContext;

	const [admin, setAdmin] = useState({
		username: "",
		password: ""
	});
	const { username, password } = admin;

	// set component
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onChange = e =>
		setAdmin({ ...admin, [e.target.name]: e.target.value });

	const handleSubmit = e => {
		e.preventDefault();
		updatePassword(admin);
		setOpen(false);
		// then(console.log(res));
	};

	return (
		<div>
			{/* <IconButton 
        edge="end" 
        aria-label="delete" 
        onClick={handleClickOpen}
      >
				<EditIcon />
			</IconButton> */}
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
					onSubmit={handleSubmit}
				>
					<DialogTitle id="form-dialog-title">Admin Form</DialogTitle>
					<DialogContent>
						<DialogContentText>Create new Admin</DialogContentText>
						<TextField
							id="outlined-textarea"
							label="Name"
							// placeholder="Name"
              defaultValue={admin.username}
							multiline
							variant="outlined"
							name="username"
							value={username}
							// onChange={onChange}
							InputProps={{
								readOnly: true
							}}
						/>

						<TextField
							id="outlined-textarea"
							label="password"
							placeholder="Password"
							multiline
							variant="outlined"
							name="password"
							value={password}
							onChange={onChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							// onClick={handleClose}
							color="primary"
							type="submit"
							value="addAdmin"
							onClick={handleSubmit}
							// onClick={handleClose}
						>
							Create
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
}
