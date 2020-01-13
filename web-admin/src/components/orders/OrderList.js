import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import OrderContext from "../../contexts/order/OrderContext";
import OrderForm from "../modalForms/order/orderForm";

export default function OrderList(status) {
	const classes = useStyles();
	const orderContext = useContext(OrderContext);
	const { orders, getOrderByStat, updateOrder } = orderContext;
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	var value = status.status;
	const GetStat = value => {
		if (value === 2) return "completed";
		if (value === 0) return "waiting";
		if (value === 1) return "received";
		else return null;
	};
	const statString = GetStat(value);

	//handle state
	useEffect(() => {
		getOrderByStat(GetStat(value));

	}, [status, value, orders]);

	//handle props
	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	//dialog handling
	const [openDialog, setOpenDialog] = React.useState(false);
	const [selectedRow, setSelectedRow] = React.useState(null);

	return (
		<div>
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell>Total Price</TableCell>
								<TableCell>Time</TableCell>
								<TableCell>Date</TableCell>
								<TableCell>Status</TableCell>
								<TableCell>Detail</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{orders
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map(order => {
									const createdAt = new Date(order.createdAt);
									const date = `${createdAt.getDate()}/${createdAt.getMonth() +
										1}/${createdAt.getFullYear()}`;
									const time = `${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;

									return (
										<TableRow
											hover
											role="checkbox"
											// onClick={() => {
											// 	setSelectedRow(order._id);
											// 	setSelectedRow(order.status);
											// }}
											key={order._id}
										>
											<TableCell>{order.name}</TableCell>
											<TableCell>
												{order.totalPrice}
											</TableCell>
											<TableCell>{time}</TableCell>
											<TableCell>{date}</TableCell>
											<TableCell>
												{statString == "waiting" ? (
													<Button
														variant="outlined"
														onClick={() => {
															updateOrder(
																order._id,
																{
																	status:
																		"received"
																}
															);
														}}
													>
														{" "}
														Received
													</Button>
												) : statString == "received" ? (
													<Button
														variant="outlined"
														onClick={() => {
															updateOrder(
																order._id,
																{
																	status:
																		"completed"
																}
															);
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
											</TableCell>
											<TableCell>
												<Button
													variant="outlined"
													onClick={() => {
														setOpenDialog(true);
														setSelectedRow(
															order._id
														);
													}}
												>
													{" "}
													Detail
												</Button>
											</TableCell>
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={orders.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>

			<div>
				<OrderForm
					props={openDialog}
					setProps={setOpenDialog}
					orderID={selectedRow}
					orderStat={statString}
				/>
			</div>
		</div>
	);
}

const useStyles = makeStyles({
	root: {
		width: "100%",
		overflowX: "auto",
		overflowY: "auto"
	},
	container: {
		maxHeight: 440,
		overflowX: "auto",
		overflowY: "auto"
	}
});
