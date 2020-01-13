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
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import OrderContext from "../../../contexts/order/OrderContext";

import axios from "axios";
import { url } from "../../../routers/Networking";

export default function OrderForm({ props, setProps, orderID, orderStat }) {
	//set state
	const orderContext = useContext(OrderContext);
	const { updateOrder } = orderContext;

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
		console.log(orderStat);
	}, [orderID]);

	// set component
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

	const handleClickOpen = () => {
		setProps(true);
	};

	const handleClose = () => {
		setProps(false);
	};



	const handleSubmit = e => {
		e.preventDefault();
		// updateOrder(orderID, stat);
		setProps(false);
	};

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
									<TableCell align="center" colSpan={4}>
										Details
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Desc</TableCell>
									<TableCell>Price</TableCell>
									<TableCell>Qty</TableCell>
									<TableCell>Sum</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{details.map(detail => {
									return (
										<TableRow>
											<TableCell>{detail.name}</TableCell>
											<TableCell>
												{detail.unitPrice}
											</TableCell>
											<TableCell>
												{detail.quantity}
											</TableCell>
											<TableCell>
												{detail.totalPrice}
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TableCell colSpan={2}></TableCell>
									<TableCell>Total</TableCell>
									<TableCell>
										{details
											.map(detail =>
												parseInt(detail.totalPrice)
											)
											.reduce((a, b) => a + b, 0)}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</DialogContent>

				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary"
						variant="contained"
					>
						Cancel
					</Button>

					{orderStat == "waiting" ? (
						<Button
							variant="outlined"
							onClick={() => {
								updateOrder(orderID, { status: "received" });
								handleClose();
							}}
						>
							Received
						</Button>
					) : orderStat == "received" ? (
						<Button
							variant="outlined"
							onClick={() => {
								updateOrder(orderID, { status: "completed" });
								handleClose();
							}}
						>
							{" "}
							Completed
						</Button>
					) : (
						<TextField
							id="filled-read-only-input"
							label=""
							defaultValue="Completed"
							InputProps={{
								readOnly: true
							}}
							variant="filled"
						/>
					)}
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
