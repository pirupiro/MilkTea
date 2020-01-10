import React, { Fragment } from "react";
import { Router, Route, Switch } from "react-router-dom";
//get component
import Home from "../components/views/Home";
import Login from "../components/views/Login";
import Admin from "../components/views/Admin";
import Category from "../components/views/Category";
import Order from "../components/views/Order";
import ProtectedRoute from "./ProtectedRoute";
import history from "./history.js";

export default function AppRouter() {
	return (
		<Router history={history}>
			<Fragment>
				<div className="App">
					<Switch>
						<Route path="/" exact component={Login} />
						<Route path="/login" exact component={Login} />
						<Route path="/home" exact component={Home} />
						<Route path="/admin" component={Admin} />
						<Route path="/category" component={Category} />
						<Route path="/order" component={Order} />
						<Route path="*" component={() => "404 not found"} />
						{/* <Home></Home> */}
					</Switch>
				</div>
			</Fragment>
		</Router>
	);
}
