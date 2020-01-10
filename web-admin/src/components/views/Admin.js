import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

import ResponsiveDrawer from "../layouts/ResponsiveDrawer";
import AdminList from "../admins/AdminList";
import CreateAdmin from "../modalForms/admin/CreateAdminForm"

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: "flex"
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0
		}
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up("sm")]: {
			display: "none"
		}
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

export default function Admin() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<ResponsiveDrawer></ResponsiveDrawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
        <CreateAdmin></CreateAdmin>
				
				{/* <CreateItemForm></CreateItemForm> */}
				<AdminList></AdminList>
			</main>
		</div>
	);
}
