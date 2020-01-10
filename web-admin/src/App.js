import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRouter from "./routers/AppRouter";

//get state provider
import AdminState from "./contexts/admin/AdminState";
import ItemState from "./contexts/item/ItemState";
import AuthState from "./contexts/auth/AuthState";
import CategoryState from "./contexts/category/CategoryState";

const App = props => {
	return (
		<AuthState>
			<AdminState>
				<CategoryState>
					<ItemState>
						<div className="container">
							<AppRouter />
						</div>
					</ItemState>
				</CategoryState>
			</AdminState>
		</AuthState>
	);
};

export default App;
