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

import OrderContext from "../../contexts/order/OrderContext";
import OrderForm from "../modalForms/order/orderForm";


export default function OrderList(status) {
	const classes = useStyles();
	const orderContext = useContext(OrderContext);
	const { orders, getOrderByStat } = orderContext;
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	var value = status.status;
	const GetStat = value => {
		if (value === 2) return "completed";
		if (value === 0) return "waiting";
		if (value === 1) return "received";
		else return null;
	};

	//handle state
	useEffect(() => {
		const data = getOrderByStat(GetStat(value));

		// console.log(data);
		// console.log(GetStat(value));
		// console.log(selectedRow)
	}, [status, value]);

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
									const date = `${createdAt.getDate()}/${createdAt.getMonth() + 1}/${createdAt.getFullYear()}`;
									const time = `${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;

									return (
										<TableRow
											hover
											role="checkbox"
											onClick={() => {
												setOpenDialog(true);
												setSelectedRow(order._id);
											}}
											key={order._id}
										>
											<TableCell>{order.name}</TableCell>
											<TableCell>{order.totalPrice}</TableCell>
											<TableCell>{time}</TableCell>
											<TableCell>{date}</TableCell>
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
