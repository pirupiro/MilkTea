import React, { useContext, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import ItemDetail from "./ItemDetail";
import ItemContext from "../../contexts/item/ItemContext";


const useStyles = makeStyles(theme => ({
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	card: {
		height: "100%",
		display: "flex",
		flexDirection: "column"
	},
	cardMedia: {
		paddingTop: "45.25%" // 16:9
	},
	cardContent: {
		flexGrow: 1,
		padding: theme.spacing(3)
	}
}));

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function ItemList() {
	const itemContext = useContext(ItemContext);
	const { items, getItem } = itemContext;

	useEffect(() => {
		getItem();		
		
	}, []);

	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<main>
				<Container className={classes.cardGrid} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{items.map(item => {
							return (
								<Grid item key={item._id} xs={12} sm={6} md={4}>
									<ItemDetail item={item} key={item._id} />
								</Grid>
							);
						})}
					</Grid>
				</Container>
			</main>
		</React.Fragment>
	);
}
