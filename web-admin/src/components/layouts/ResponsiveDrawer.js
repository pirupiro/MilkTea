import React,{ useContext} from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import { Link } from "react-router-dom";
import { Link } from '@material-ui/core';

import ListAltIcon from '@material-ui/icons/ListAlt';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import LocalDrinkIcon from "@material-ui/icons/LocalDrink";
import CategoryIcon from "@material-ui/icons/Category";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import AuthContext from "../../contexts/auth/AuthContext";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
	const { container } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	//set state
	const authContext = useContext(AuthContext);
	const { logout } = authContext;

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const onClickLogout = () => {
		logout();
	}
	

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				<Link href="/" color='textPrimary'>
					<ListItem button>
						<div className="drinkLink"></div>
						<ListItemIcon>
							<LocalDrinkIcon/>
						</ListItemIcon>
						<ListItemText primary="drinks" />
						<Divider />
					</ListItem>
				</Link>

				<Link href="/category" color='textPrimary'>
					<ListItem button>
						<ListItemIcon>
							<div className="categoriesLink" />
							<ListItemIcon>
								<CategoryIcon/>>
							</ListItemIcon>
							<ListItemText primary="Category" />
							<Divider />
						</ListItemIcon>
					</ListItem>
				</Link>

				<Link href="/admin" color='textPrimary'>
					<ListItem button>
						<ListItemIcon>
							<div className="adminsLink" />
							<ListItemIcon>
								<AccessibilityIcon/>>
							</ListItemIcon>
							<ListItemText primary="Admin" />
							<Divider />
						</ListItemIcon>
					</ListItem>
				</Link>

				<Link href="/order" color='textPrimary'>
					<ListItem button>
						<ListItemIcon>
							<div className="orderLink" />
							<ListItemIcon>
								<ListAltIcon/>>
							</ListItemIcon>
							<ListItemText primary="Order" />
							<Divider />
						</ListItemIcon>
					</ListItem>
				</Link>

				<ListItem button onClick={onClickLogout}>
						<ListItemIcon >
							<div className="Logout" />
							<ListItemIcon>
								<ExitToAppIcon/>>
							</ListItemIcon>
							<ListItemText primary="Logout" />
							<Divider />
						</ListItemIcon>
					</ListItem>
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						Sylas web admin Milk Tea App
					</Typography>
					{/* <Button onClick={onClickLogout}>
						Logout
					</Button> */}
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="mailbox folders">
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Hidden smUp implementation="css">
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper
						}}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation="css">
					<Drawer
						classes={{
							paper: classes.drawerPaper
						}}
						variant="permanent"
						open
					>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>
		</div>
	);
}

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


export default ResponsiveDrawer;