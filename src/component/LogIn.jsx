import "../style/login.css"
import TextField from "@mui/material/TextField";
import { useState } from "react";

function LogIn() {

	const [username, setUsername] = useState("")
	const [password, setpassword] = useState("");


	const onUserNameChange = (event) => {
		setUsername(event.target.value)
	}

	const onPasswordChange = (event) => {
		setpassword(event.target.value);
	};

	const onLogin = () => {

	}

    return (
		<div className="container loginMain">
			<span className="loginHeader">Login</span>
			<form className="form " action="">
				<TextField
					className="input"
					id="standard-basic"
					label="username"
					variant="standard"
					value={username}
					onChange={onUserNameChange}
				/>
				<TextField
					className="input"
					type={"password"}
					id="standard-basic"
					label="password"
					variant="standard"
					value={password}
					onChange={onPasswordChange}
				/>
				<button className="btn login" onClick={onLogin}>
					LogIn
				</button>
			</form>
		</div>
	);
}

export default LogIn;