import "./App.css";
import Navbar from "./component/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./component/LogIn";
import { useState } from "react";
import SpaceAllocation from "./component/SpaceAllocation";
import { ToastContainer } from "react-toastify";
import Home from "./component/Home";

function App() {
	const [user, setUser] = useState({});
	return (
		<BrowserRouter>
			<div className="App">
				<Navbar user={user} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LogIn user={user} setUser={setUser} />} />
					<Route path="/spaceAllowcation" element={<SpaceAllocation user={user} setUser={setUser} />} />
				</Routes>
			</div>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</BrowserRouter>
	);
}

export default App;
