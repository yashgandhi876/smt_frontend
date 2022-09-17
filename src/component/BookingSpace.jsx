import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../style/BookingSpace.css";
import Dropdown from "./Dropdown";


function BookingSpace() {
    const [teamData, setTeamData] = useState([])
    const [teamName, setTeamName] = useState();
	const [floorNumber, setFloorNumber] = useState();
    const [zoneNumber, setZoneNumber] = useState();
    const [seatNumbers, setSeatNumbers] = useState([]);
    const [teamNameOption, setTeamNameOption] = useState([{ key: 1, text: "Team 1", value: 1 }]);
	const [floorOptions, setFloorOptions] = useState([{ key: 1, text: "Floor 1", value: 1 }]);
    const [zoneOption, setZoneOption] = useState([{ key: 1, text: "Zone 1", value: 1 }]);
    const [seatNumbersOptions, setSeatNumbersOptions] = useState([
		{ key: 1, text: 1, value: 1 },
		{ key: 2, text: 2, value: 2 },
		{ key: 3, text: 3, value: 3 },
		{ key: 4, text: 4, value: 4 },
		{ key: 5, text: 5, value: 5 },
	]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/getTeams").then(data => {
            setTeamData(data)
            // setFloorOptions(
			// 	dataList.map((data) => ({
			// 		key: data.id,
			// 		value: data.id,
			// 		text: data.name,
			// 	}))
			// );
        }).catch(error => {
            toast.error("Failed to fetch data of teams", {
				position: "bottom-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
        })
    }, [])

    const onTeamNameChange = (event) => {
		setTeamName(event.target.value);
	};

	const onFloorNumberChange = (event) => {
		setFloorNumber(event.target.value)
	};

    const onZoneNumberChange = (event) => {
		setZoneNumber(event.target.value);
	};

    const onSeatNumbersChange = (event) => {
        setSeatNumbers([...seatNumbers, ...event.target.value]);
    }

	return (
		<div className="bookingSpaceMainDiv">
			<div className="teamAllocationRow">
				<Dropdown
					dropdownId={"teamName"}
					dropdownlabel={"Team Name"}
					options={teamNameOption}
					label={"Team Name"}
					labelId={"teamNameId"}
					dropDownValue={teamName}
					onDropdownChange={onTeamNameChange}
					dropDownPlaceholder={"Team Name"}
					classNameDropDown={""}
					multiple={false}
				/>
				<Dropdown
					dropdownId={"floorname"}
					dropdownlabel={"Floor No"}
					options={floorOptions}
					label={"Floor No"}
					labelId={"floorNumberId"}
					dropDownValue={floorNumber}
					onDropdownChange={onFloorNumberChange}
					dropDownPlaceholder={"Floor Name"}
					classNameDropDown={""}
					multiple={false}
				/>

				<Dropdown
					dropdownId={"zoneNumber"}
					dropdownlabel={"Zone Number"}
					options={zoneOption}
					label={"Zone Number"}
					labelId={"zoneNumberId"}
					dropDownValue={zoneNumber}
					onDropdownChange={onZoneNumberChange}
					dropDownPlaceholder={"Zone Number"}
					classNameDropDown={""}
					multiple={false}
				/>

				<Dropdown
					dropdownId={"seatNumbers"}
					dropdownlabel={"Seat Numbers"}
					options={seatNumbersOptions}
					label={"Seat Numbers"}
					labelId={"seatNumbersId"}
					dropDownValue={seatNumbers}
					onDropdownChange={onSeatNumbersChange}
					dropDownPlaceholder={"Seat Numbers"}
					classNameDropDown={""}
					multiple={true}
				/>
			</div>
		</div>
	);
}

export default BookingSpace;
