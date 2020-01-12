import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

import CategoryContext from "../../contexts/category/CategoryContext";

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
	}
}));

export default function CategoryDetail({ category }) {
	//prep state
	const categoryContext = useContext(CategoryContext);
	const { updateCategory } = categoryContext;
	const [name, setName] = useState("");

	//prep component
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = e => {
		e.preventDefault();
		updateCategory(category._id, { name });
		setOpen(false);
		// then(console.log(res));
	};

	return (
		<div>
			<div>
				<ListItem
					button
					// fullwidth="true"
					onClick={handleClickOpen}
					key="category._id"
				>
					<ListItemText
						primary={
							<Typography
								// primary={category.name}
								align="center"
							>
								{category.name}
							</Typography>
						}
					/>
				</ListItem>
			</div>

			{/* define dialog box */}
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
					onSubmit={handleSubmit}
				>
					<DialogTitle id="form-dialog-title">
						Category Form
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Create new Category
						</DialogContentText>

						<TextField
							id="outlined-textarea"
							label="Old name"
							multiline
							variant="outlined"
							value={category.name}
							// onChange={onChange}
						/>

						<TextField
							id="outlined-textarea"
							label="New name"
							multiline
							variant="outlined"
							value={category.name || ''}
							onChange={e => setName(e.target.value)}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button
							color="primary"
							type="submit"
							onClick={handleSubmit}
						>
							Update
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
}
