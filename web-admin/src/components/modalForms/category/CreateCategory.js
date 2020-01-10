import React, { useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import CategoryContext from "../../../contexts/category/CategoryContext";

export default function CreateCategoryForm() {
	//set state
	const categoryContext = useContext(CategoryContext);

	const { addCategory } = categoryContext;

	const [category, setCategory] = useState({
		name: "",		
	});
	const { name } = category;

	// set component
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onChange = e =>
		setCategory({ ...category, [e.target.name]: e.target.value });

	const handleSubmit = e => {
		e.preventDefault();
		addCategory(category)
		setOpen(false);
			// then(console.log(res));
	};

	return (
		<div>
			<Button
				fullWidth
				variant="outlined"
				color="secondary"
				onClick={handleClickOpen}
			>
				Open form dialog
			</Button>
			<div >
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
					onSubmit={handleSubmit}
				>
					<DialogTitle id="form-dialog-title">Category Form</DialogTitle>
					<DialogContent>
						<DialogContentText>Create new Category</DialogContentText>
						<TextField
							id="outlined-textarea"
							label="Name"
							placeholder="Name"
							multiline
							variant="outlined"
							name="name"
							value={name}
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
							value="addCategory"
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
