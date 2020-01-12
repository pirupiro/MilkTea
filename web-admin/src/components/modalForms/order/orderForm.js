import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import OrderContext from "../../../contexts/order/OrderContext";

import axios from "axios";
import { url } from "../../../routers/Networking";

export default function OrderForm({ props, setProps, orderID }) {
	//set state
	const orderContext = useContext(OrderContext);
	const { orders, getOrderByID } = orderContext;
	// const { details } = orders;
	const [details, setDetails] = useState([]);


	useEffect(() => {
		const fetchData = async () => {
			const res = await axios.get(url + "/orders/" + orderID);
			return res;
		};
		fetchData()
			.then(res => {
				setDetails(res.data.data.details);
			})
			.catch(error => {
				console.error(error);
			});

		console.log(orderID);
	}, [orderID]);

	// set component
	// const [props, setProps] = React.useState(false);
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

	const handleClickOpen = () => {
		setProps(true);
	};

	const handleClose = () => {
		setProps(false);
	};

	// const onChange = e =>
	// 	setData({ ...orders, [e.target.name]: e.target.value });

	// const handleSubmit = e => {
	// 	e.preventDefault();
	// 	updatePassword(orders._id, order);
	// 	setProps(false);
	// };

	return (
		<div>
			<Dialog
				open={props}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				// onSubmit={handleSubmit}
				className={classes.rootForm}
				fullScreen={fullScreen}
			>
				<DialogTitle id="form-dialog-title">Order Form</DialogTitle>
				<DialogContent>
					{/* <form></form> */}
					<TableContainer component={Paper}>
						<Table
							className={classes.table}
							aria-label="spanning table"
						>
							<TableHead>
								<TableRow>
									<TableCell align="center" colSpan={4}>Details</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Desc</TableCell>
									<TableCell>Price</TableCell>
									<TableCell>Qty</TableCell>
									<TableCell>Sum</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									details.map(detail => {
										return (
											<TableRow
											>
												<TableCell>{detail.name}</TableCell>
												<TableCell>{detail.unitPrice}</TableCell>
												<TableCell>{detail.quantity}</TableCell>
												<TableCell>{detail.totalPrice}</TableCell>
											</TableRow>
										);
									})
								}
								<TableRow>
									<TableCell colSpan={2}></TableCell>
									<TableCell>Total</TableCell>
									<TableCell>
										{
											details
												.map(detail => parseInt(detail.totalPrice))
												.reduce((a, b) => a + b, 0)
										}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button
						color="primary"
						type="submit"
						value="addOrder"
					// onClick={handleSubmit}
					>
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		maxWidth: 752
	},
	rootForm: {
		"& .MuiTextField-root": {
			margin: theme.spacing(1)
			// width: 1
		}
	},
	table: {
		minWidth: 700
	},
	form: {
		display: "flex",
		flexDirection: "column",
		margin: "auto",
		width: "fit-content"
	}
}));
