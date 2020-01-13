import React, { useContext, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";


import UpdateItemForm from "../modalForms/item/UpdateItemForm";
import ResponsiveDrawer from "../layouts/ResponsiveDrawer";
import CreateItemForm from "../modalForms/item/CreateItemForm";
import ItemContext from "../../contexts/item/ItemContext";
import ItemList from "../items/ItemList";
import { ImagePath } from "../../routers/Networking";

const drawerWidth = 240;

export default function Home() {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const itemContext = useContext(ItemContext);
	const { items, getItem } = itemContext;

	useEffect(() => {
		getItem();
		// ImagePath(item.image);
	}, []);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	//prep componen

	const handleClickOpen = () => {
		setOpen(true);
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<ResponsiveDrawer></ResponsiveDrawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />

				<CreateItemForm></CreateItemForm>
				<ItemList></ItemList>
			</main>
		</div>
	);
}
const useStyles = makeStyles(theme => ({

	root: {
		display: "flex",
		// flexWrap: "wrap",
		// justifyContent: "space-around",
		// overflow: "hidden"
		// backgroundColor: theme.palette.background.paper
	},
	gridList: {
		width: 930,
		height: 650,
		// cols: 3
		spacing: 10
	},
	icon: {
		color: "rgba(255, 255, 255, 0.54)"
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
