import "../style/navbar.css"
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div className="headerMain">
			<div className="hederContent">
				<div className="headerNameBox">
					<Link className="link name" to="/">
						<h2 className="headerName">Space Managment Tool</h2>
					</Link>
				</div>
				<div className="links">
					<Link className="link login" to="/spaceAllowcation">
						Allocate Space
					</Link>
					<Link className="link login" to="/login">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Navbar;