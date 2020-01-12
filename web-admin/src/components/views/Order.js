import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import axios from "axios";

import ResponsiveDrawer from "../layouts/ResponsiveDrawer";
import OrderList from "../../components/orders/OrderList";

const drawerWidth = 240;

export default function Order() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(0);

	//handle state
	useEffect(() => {

	}, []);

	//handle props
	const handleChange = (event, newValue) => {
		setValue(newValue);
		
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<ResponsiveDrawer></ResponsiveDrawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Tabs
					value={value}
					// value={location.pathname}
					onChange={handleChange}
					indicatorColor="primary"
					textColor="primary"
					centered
				>
					<Tab label="Waiting" component={Link} to="/order/waiting" />

					<Tab
						label="Received"
						component={Link}
						to="/order/received"
					/>

					<Tab
						label="Completed"
						component={Link}
						to="/order/completed"
					/>
				</Tabs>
				<div>
					<OrderList status={value} />
				</div>
			</main>
		</div>
	);
}

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex",
		flexGrow: 1 //add in centered tabs
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));
