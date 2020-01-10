import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";

import CategoryContext from "../../contexts/category/CategoryContext";
import CategoryDetail from "./CategoryDetail";

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

export default function CategoryList() {
	const categoryContext = useContext(CategoryContext);

	const { categories, getCategory } = categoryContext;

	useEffect(() => {
		getCategory();
	}, []);

	//prep component
	const classes = useStyles();
	const [dense, setDense] = React.useState(false);
	

	return (
		<div>
			<Typography variant="h6" className={classes.title}>
				Category List
			</Typography>
			<div className={classes.demo}>
				<List dense={dense}>
					{categories.map(category => {
						return (
							<CategoryDetail
								category={category}
								key={category._id}
							/>
						);
					})}
				</List>
			</div>
		</div>
	);
}
