import './App.css';
import Navbar from './component/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from './component/LogIn';

function App() {
  return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<Routes>
					<Route path="/" element={<>Home</>} />
					<Route path="/login" element={<LogIn />} />
				</Routes>
			</div>
		</BrowserRouter>
  );
}

export default App;
