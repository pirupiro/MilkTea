import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ButtonBase from "@material-ui/core/ButtonBase";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ItemContext from "../../contexts/item/ItemContext";
import { url, getImageURI, ImagePath } from "../../routers/Networking";

const useStyles = makeStyles(theme => ({
	cardGrid: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(2)
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column",
		padding: theme.spacing(2)
	},
	cardMedia: {
		paddingTop: "45.25%" // 16:9
	},
	cardContent: {
		flexGrow: 10
	},
	root: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1),
			width: 200
		}
	},
	input: {
		display: "none"
	}
}));

export default function ItemDetail({ item }) {
	const itemContext = useContext(ItemContext);
	const { deleteItem, updateItem } = itemContext;

	const [open, setOpen] = React.useState(false);

	const [data, setData] = React.useState({
		name: "",
		price: "",
		category: "",
		description: ""
	});

	useEffect(() => {
		ImagePath(item.image);
	}, []);

	//prep componen

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const onDelete = () => {
		deleteItem(item._id);
	};

	const handleSubmit = e => {
		e.preventDefault();
		updateItem(item._id, data);
		setOpen(false);
	};

	const onChange = e => setData({ ...data, [e.target.name]: e.target.value });

	const classes = useStyles();
	return (
		<div>
			<CardActions>
				<React.Fragment>
					<CssBaseline />
					<CardActions>
						<ButtonBase onClick={handleClickOpen}>
							<Card className={classes.card} spacing={2} xs>
								<CardMedia
									className={classes.cardMedia}
									image={ImagePath(item.image)}
									title={item.name}
									key={item._id}
									button
								/>
								<CardContent className={classes.cardContent}>
									<Typography
										gutterBottom
										variant="h5"
										component="h2"
									>
										{item.name}
									</Typography>
									<Typography>{item.price}</Typography>
								</CardContent>
								<CardActions>
									<Button
										size="small"
										variant="outlined"
										color="secondary"
										className={classes.button}
										startIcon={<VisibilityIcon />}
									>
										View
									</Button>
									<Button
										size="small"
										variant="outlined"
										color="secondary"
										className={classes.button}
										startIcon={<DeleteIcon />}
										onClick={onDelete}
									>
										Delete
									</Button>
								</CardActions>
							</Card>
						</ButtonBase>
					</CardActions>
				</React.Fragment>
			</CardActions>
			<div>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="form-dialog-title"
					className={classes.root}
					onSubmit={handleSubmit}
				>
					<DialogTitle id="form-dialog-title">Admin Form</DialogTitle>
					<DialogContent>
						<DialogContentText>Create new Admin</DialogContentText>

						<TextField
							id="outlined-textarea"
							label="name"
							multiline
							variant="outlined"
							onChange={onChange}
						/>

						<TextField
							id="outlined-number"
							label="Price"
							type="number"
							InputLabelProps={{
								shrink: true
							}}
							variant="outlined"
							onChange={onChange}
							fullWidth
						/>

						<TextField
							id="outlined-textarea"
							label="Description"
							multiline
							variant="outlined"
							onChange={onChange}
						/>

						<TextField
							id="outlined-textarea"
							label="Category"
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
