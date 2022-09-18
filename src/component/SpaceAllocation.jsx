import { useEffect, useState } from "react";
import "../style/spaceAllocation.css";
import BookingSpace from "./BookingSpace";
import { Navigate } from "react-router-dom";

function SpaceAllocation(props) {
	const [totalNumberOfSeats, setTotalNumberOfSeats] = useState(0);

	useEffect(() => {
		if (Object.keys(props.user).length !== 0) {
			setTotalNumberOfSeats(props.user.totalSeats);
		}
	}, []);

	return (
		<div className="spaceAllocationMain">
			{Object.keys(props.user).length === 0 && <Navigate to="/login" replace={true} />}
			<div className="allocatedSpaceDetails">
				<h3>Seats Available: {totalNumberOfSeats}</h3>
			</div>
			<div className="bookingSpaceMain">
				<BookingSpace
					user={props.user}
					totalNumberOfSeats={totalNumberOfSeats}
					setTotalNumberOfSeats={setTotalNumberOfSeats}
				/>
			</div>
		</div>
	);
}

export default SpaceAllocation;
