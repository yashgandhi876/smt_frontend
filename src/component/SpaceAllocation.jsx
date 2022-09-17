
import axios from "axios";
import { useEffect, useState } from "react";
import "../style/spaceAllocation.css"
import BookingSpace from "./BookingSpace";

function SpaceAllocation() {
    const [totalNumberOfSeats, setTotalNumberOfSeats] = useState(0)

    useEffect(() => {
        axios.get("http://localhost:8080/api/totalSeatCount").then(seatCount => {
            setTotalNumberOfSeats(seatCount)
        })
    }, [])

	return (
		<div className="spaceAllocationMain">
			<div className="allocatedSpaceDetails">
				<h3>Total Number of seats : {totalNumberOfSeats}</h3>
			</div>
            <div className="bookingSpaceMain">
                <BookingSpace />
            </div>
		</div>
	);
}

export default SpaceAllocation;