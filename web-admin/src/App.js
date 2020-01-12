import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AppRouter from "./routers/AppRouter";

//get state provider
import AdminState from "./contexts/admin/AdminState";
import ItemState from "./contexts/item/ItemState";
import AuthState from "./contexts/auth/AuthState";
import CategoryState from "./contexts/category/CategoryState";
import OrderState from "./contexts/order/OrderState";
const App = props => {
	return (
		<AuthState>
			<AdminState>
				<CategoryState>
					<ItemState>
						<OrderState>
							<div className="container">
								<AppRouter />
							</div>
						</OrderState>
					</ItemState>
				</CategoryState>
			</AdminState>
		</AuthState>
	);
};

export default App;
