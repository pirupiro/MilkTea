import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import AdminContext from "../../contexts/admin/AdminContext";
import AdminDetail from "./AdminDetail";

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

export default function AdminList() {
	const adminContext = useContext(AdminContext);

	const { admins, getAdmin } = adminContext;

	useEffect(() => {
		getAdmin();
	}, []);

	//prep component
	const classes = useStyles();
	const [dense, setDense] = React.useState(false);
	// const [secondary, setSecondary] = React.useState(false);
	const [open, setOpen] = React.useState(true);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<div>
			<Typography variant="h6" className={classes.title}>
				Admin List
			</Typography>
			<div className={classes.demo}>
				<List dense={dense}>
					{admins.map(admin => {
						return <AdminDetail admin={admin} key={admin._id} />;
					})}
				</List>
			</div>
		</div>
	);
}
