import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import AuthContext from "../../contexts/auth/AuthContext";
import axios from "axios";
import { url } from "../../routers/Networking";
import history from "../../routers/history";

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function Login() {
	const classes = useStyles();

	// set context
	const authContext = useContext(AuthContext);
	const { login } = authContext;

	const [admin, setAdmin] = useState({
		username: "",
		password: ""
	});

	const { username, password } = admin;

	const onChange = e =>
		setAdmin({ ...admin, [e.target.name]: e.target.value });

	const handleSubmit = e => {
		e.preventDefault();
		// login(admin)09
		async function logIn() {
			const res = await axios.post(url + "/users/login", {
				username,
				password
			});
			return res.data;
		}

		logIn().then(data => {
			if (data.error) {
				alert(data.message);
			}
			history.push("/home");
		});
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						autoFocus
						id="username"
						label="username"
						name="username"
						autoComplete="username"
						value={username}
						onChange={onChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={password}
						onChange={onChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign In
					</Button>
				</form>
			</div>
		</Container>
	);
}
