import { useEffect, useState } from "react";
import "../style/spaceAllocation.css"
import BookingSpace from "./BookingSpace";

function SpaceAllocation(props) {
    const [totalNumberOfSeats, setTotalNumberOfSeats] = useState(0)

    useEffect(() => {
        setTotalNumberOfSeats(props.user.totalSeats)
    }, [])

	return (
		<div className="spaceAllocationMain">
			<div className="allocatedSpaceDetails">
				<h3>Total Number of seats : {totalNumberOfSeats}</h3>
			</div>
            <div className="bookingSpaceMain">
                <BookingSpace user={props.user} />
            </div>
		</div>
	);
}

export default SpaceAllocation;