import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ItemContext from "../../../contexts/item/ItemContext";
import CategoryContext from "../../../contexts/category/CategoryContext";

// styling
const useStyles = makeStyles(theme => ({
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: 200,
			// display: "flex",
			// flexWrap: "wrap"
		}
	},
	input: {
		display: "none"
	},
	upload: {
		"& > *": {
			margin: theme.spacing(1)
		}
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200
	}
}));

// component
const CreateAdminForm = () => {
	const data = new FormData();
	//state
	const itemContext = useContext(ItemContext);
	const { items, addItem } = itemContext;
	const [name, setName] = useState([]);
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
		if (name.length === 0
			|| price.length === 0
			|| category.length === 0
			|| description.length === 0
			|| image.length === 0) {
			alert("fields is empty, you must fill in");
		}
		addItem(data);
		console.log(name)
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
				className={classes.root}
			>
				Add Drinks
			</Button>
			<form method="post" id="formID" encType="multipart/form-data">
				{/* <form ref={el => (this.form = el)}> */}
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
					// className={classes.root}
					id="formID"
				>
					<DialogTitle id="form-dialog-title">
						Create form
					</DialogTitle>

					<DialogContent>
						<DialogContentText>Create new drinks</DialogContentText>
						<TextField
							id="outlined-textarea"
							required
							label="Name"
							placeholder="Name"
							variant="outlined"
							name="name"
							// value="name"
							// onChange={onChange}
							onChange={e => setName(e.target.value)}
							fullWidth
							style={{ margin: 8 }}
							margin="normal"
							multiline
						/>
						<TextField
							id="outlined-number"
							required
							label="Price"
							type="number"
							InputLabelProps={{
								shrink: true
							}}
							variant="outlined"
							// onChange={onChange}
							onChange={e => setPrice(e.target.value)}
							fullWidth
							className={classes.textField}
						/>

						<TextField
							id="standard-select-currency"
							required
							select
							label="Category"
							onChange={e => setCategory(e.target.value)}
							error={category === ""}
							helperText={
								category === "" ? "Select category" : " "
							}
							className={classes.textField}
						>
							{categories.map(option => (
								<MenuItem key={option.name} value={option.name}>
									{option.name}
								</MenuItem>
							))}
						</TextField>

						<TextField
							id="outlined-number"
							required
							label="Description"
							placeholder="Description"
							variant="outlined"
							name="description"
							rows="4"
							fullWidth
							style={{ margin: 8 }}
							margin="normal"
							onChange={e => setDescription(e.target.value)}
							error={description.name === ""}
							helperText={
								description.name === "" ? "Empty field!" : " "
							}
							fullWidth
							multiline
						/>

						<div className={classes.upload}>
							<input
								required
								accept="image/*"
								className={classes.input}
								id="contained-button-file"
								multiple
								type="file"
								name="image"
								error={image.name === ""}
								helperText={
									image.name === "" ? "Empty field!" : " "
								}
								onChange={e => {
									setImage(e.target.files[0]);
									console.log(e.target.files[0]);
								}}
							/>
							<label htmlFor="contained-button-file">
								<Button
									variant="contained"
									color="primary"
									component="span"
								>
									Upload
								</Button>
								<Typography> {image.name}</Typography>
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
