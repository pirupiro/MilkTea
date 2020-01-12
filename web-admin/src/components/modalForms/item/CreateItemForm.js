import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from "@material-ui/core/styles";

import ItemContext from "../../../contexts/item/ItemContext";
import CategoryContext from "../../../contexts/category/CategoryContext";

// styling
const useStyles = makeStyles(theme => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: 200
		}
	},
	input: {
		display: "none"
	},
	upload: {
		"& > *": {
			margin: theme.spacing(1)
		}
	}
}));

// component
const CreateAdminForm = () => {
	const data = new FormData();
	//state
	const itemContext = useContext(ItemContext);
	const { items, addItem } = itemContext;
	const [name, setName] = useState({});
	const [price, setPrice] = useState({});
	const [category, setCategory] = useState({});
	const [image, setImage] = useState({});
	const [description, setDescription] = useState({});

	const categoryContext = useContext(CategoryContext);

	const { categories, getCategory } = categoryContext;

	useEffect(() => {
		getCategory();
	}, []);

	//style
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();

	const handleSubmit = e => {
		e.preventDefault();

		data.append("name", name);
		data.append("price", price);
		data.append("category", category);
		data.append("description", description);
		data.append("image", image);

		addItem(data);
		setOpen(false);
	};
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				fullWidth
				variant="outlined"
				color="secondary"
				onClick={handleClickOpen}
			>
				Add Drinks
			</Button>
			<form method="post" id="formID" encType="multipart/form-data">
				{/* <form ref={el => (this.form = el)}> */}
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
					className={classes.root}
					id="formID"
				>
					<DialogTitle id="form-dialog-title">
						Create form
					</DialogTitle>

					<DialogContent>
						<DialogContentText>Create new drinks</DialogContentText>
						<TextField
							id="outlined-textarea"
							label="Name"
							placeholder="Name"
							variant="outlined"
							name="name"
							// value="name"
							// onChange={onChange}
							onChange={e => setName(e.target.value)}
							fullWidth
							multiline
						/>
						<TextField
							id="outlined-number"
							label="Price"
							type="number"
							InputLabelProps={{
								shrink: true
							}}
							variant="outlined"
							// onChange={onChange}
							onChange={e => setPrice(e.target.value)}
							fullWidth
						/>

						<TextField
							id="outlined-number"
							label="Description"
							placeholder="Description"
							variant="outlined"
							name="description"
							// value="description"
							// onChange={onChange}
							onChange={e => setDescription(e.target.value)}
							fullWidth
							multiline
						/>

						<TextField
							id="standard-select-currency"
							select
							label="Select"
							// value={currency}
							onChange={e => setCategory(e.target.value)}
							helperText="Please select your currency"
						>
							{categories.map(option => (
								<MenuItem
									key={option.name}
									value={option.name}
								>
									{option.name}
								</MenuItem>
							))}
						</TextField>

						<div className={classes.upload}>
							<input
								accept="image/*"
								className={classes.input}
								id="contained-button-file"
								multiple
								type="file"
								name="image"
								// value={image}
								// onChange={onChange}
								onChange={e => {
									setImage(e.target.files[0]);
									console.log(setImage);
								}}
							/>
							<label htmlFor="contained-button-file">
								<Button
									variant="contained"
									color="primary"
									component="span"
									// onClick={onClickUpload}
								>
									Upload
								</Button>
							</label>
						</div>
					</DialogContent>

					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							onClick={handleClose}
							color="primary"
							type="submit"
							onClick={handleSubmit}
						>
							Create
						</Button>
					</DialogActions>
				</Dialog>
			</form>
		</div>
	);
};

export default CreateAdminForm;
