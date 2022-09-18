import "../style/login.css"
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";

function LogIn(props) {
	const [userName, setUserName] = useState("");
	const [password, setpassword] = useState("");

	useEffect(() => {
		console.log(props.user);
	}, [props.user]);

	const onUserNameChange = (event) => {
		setUserName(event.target.value);
	};

	const onPasswordChange = (event) => {
		setpassword(event.target.value);
	};

	const onLogin = () => {
		let options = {
			userName,
			passWord: password,
		};

		const headers = {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		};

		axios
			.post("http://localhost:8080/api/login", options, headers)
			.then((userInfo) => {
				props.setUser(userInfo.data);
				toast.success("LogedIn successfully!", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			})
			.catch((error) => {
				toast.error("Authentication failed please check username and password!", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});
	};

	return (
		<div className="container loginMain">
			{Object.keys(props.user).length !== 0 && <Navigate to="/spaceAllowcation" replace={true} />}
			<span className="loginHeader">Login</span>
			<div className="form " action="">
				<TextField
					className="input"
					id="standard-basic"
					label="username"
					variant="standard"
					value={userName}
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
			</div>
		</div>
	);
}

export default LogIn;