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
						{/* <Route path="/" exact component={Login} /> */}
						<Route path="/login" exact component={Login} />
						<ProtectedRoute path="/" exact component={Home} />
						<ProtectedRoute path="/admin" component={Admin} />
						<ProtectedRoute path="/category" component={Category} />
						<ProtectedRoute path="/order" component={Order} />
						<ProtectedRoute path="*" component={() => "404 not found"} />
						{/* <Home></Home> */}
					</Switch>
				</div>
			</Fragment>
		</Router>
	);
}
