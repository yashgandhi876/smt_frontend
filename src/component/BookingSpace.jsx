import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "../style/BookingSpace.css";
import CustomCard from "./CustomCard";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";

function BookingSpace(props) {
	const [teamData, setTeamData] = useState([]);
	const [value, setValue] = useState("1");
	const [teamNumber, setTeamNumber] = useState("");
	const [floorNumber, setFloorNumber] = useState("");
	const [zoneNumber, setZoneNumber] = useState("");
	const [seatNumbers, setSeatNumbers] = useState([]);
	const [teamNameOption, setTeamNameOption] = useState([]);
	const [floorOptions, setFloorOptions] = useState([]);
	const [zoneOption, setZoneOption] = useState([]);

    const [seatNumbersOptions, setSeatNumbersOptions] = useState({});

	useEffect(() => {
		axios
			.get(`http://localhost:8080/getTeams?userId=${props.user.id}`)
			.then((data) => {
				setTeamData(data.data);
				setTeamNameOption(
					data.data.map((singleData) => ({ key: singleData.id, text: singleData.team, value: singleData.id }))
				);
			})
			.catch((error) => {
				toast.error("Failed to fetch teams", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});
		axios
			.get(`http://localhost:8080/getFloors?teamId=${props.user.teamId}`)
			.then((data) => {
				setFloorOptions(
					data.data.map((singleData) => ({
						key: singleData.id,
						text: singleData.floorNumber,
						value: singleData.id,
					}))
				);
			})
			.catch((error) => {
				toast.error("Failed to fetch floors", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});
	}, []);

	const onTeamNameChange = (teamNameId) => {
		setTeamNumber(teamNameId);
	};

	const onFloorNumberChange = (floorId) => {
		setFloorNumber(floorId);
		axios
			.get(`http://localhost:8080/getZones?teamId=${props.user.teamId}&floorId=${floorId}`)
			.then((data) => {
				setZoneOption(
					data.data.map((singleData) => ({
						key: singleData.id,
						text: singleData.zoneName,
						value: singleData.id,
					}))
				);
			})
			.catch((error) => {
				toast.error("Failed to fetch zones", {
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

	const onZoneNumberChange = (zoneId) => {
		setZoneNumber(zoneId);
		axios
			.get(`http://localhost:8080/seats?teamId=${props.user.teamId}&floorId=${floorNumber}&zoneId=${zoneId}`)
			.then((data) => {

                let newData = {};
				data.data.map(
					(singleData) =>
						(newData[singleData.id] = {
							key: singleData.id,
							text: singleData.seatNumber,
							value: singleData.id,
							booked: singleData.booked,
							isDisabled: singleData.booked == 1,
						})
				);
				setSeatNumbersOptions(newData);
			})
			.catch((error) => {
				toast.error("Failed to fetch seats", {
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

	const onSeatNumbersChange = (seatId) => {
        if(seatNumbersOptions[seatId].booked === 1) {
            setSeatNumbers(seatNumbers.filter((seatNo) => seatNo != Number(seatId)));
            setSeatNumbersOptions({ ...seatNumbersOptions, [seatId]: { ...seatNumbersOptions[seatId], booked: 0 } });
        }else {
            setSeatNumbers([...seatNumbers, Number(seatId)]);
			setSeatNumbersOptions({ ...seatNumbersOptions, [seatId]: { ...seatNumbersOptions[seatId], booked: 1 } });
        }
	};

	const OnSaveData = (event) => {

		console.log(seatNumbers)
		const bookingData = {
			employeeId: props.user.id,
			teamId: Number(teamNumber),
			floorId: floorNumber,
			zoneId: zoneNumber,
			seatIds: seatNumbers,
		};

		axios
			.put(`http://localhost:8080/bookSeats`, bookingData)
			.then(() => {
				toast.success("Space allocated successfully", {
					position: "bottom-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});

				let newData = {...seatNumbersOptions};
				seatNumbers.map(seatNumber => {
					newData[seatNumber].isDisabled = true;
				})
				setSeatNumbersOptions(newData);
			})
			.catch((error) => {
				toast.error("Failed to allocate space", {
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

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className="bookingSpaceMainDiv">
			<div className="selectAny"></div>
			<div className="teamAllocationRow">
				<div className="teamCards">
					<Box sx={{ width: "100%", typography: "body1" }}>
						<TabContext value={value}>
							<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
								<TabList onChange={handleChange} aria-label="lab API tabs example">
									<Tab label="Teams" value="1" />
									<Tab label="Floors" value="2" />
									<Tab label="Zones" value="3" />
									<Tab label="Seats" value="4" />
								</TabList>
							</Box>
							<TabPanel value="1">
								<div className="teamCards">
									{teamData.map((team) => (
										<CustomCard
											className={"cardItems"}
											teamName={`${team.teamName}`}
											oeCode={`${team.oeCode}`}
											teamDescription={`${team.teamDescription}`}
											teamImg={`team${Math.floor(Math.random() * 9) + 1}.png`}
											teamManager={`${team.managerName}`}
											teamId={`${team.id}`}
											onTeamNameChange={onTeamNameChange}
											handleChange={handleChange}
										/>
									))}
									{teamData.length === 0 && <h2>No teams under you.</h2>}
								</div>
							</TabPanel>
							<TabPanel value="2">
								<div className="floorMainBtn">
									<div className="floorDiv">
										{floorOptions.map((singleFloor) => (
											<button
												key={`${singleFloor.key}`}
												className="floorButton"
												onClick={() => {
													onFloorNumberChange(singleFloor.key);
													handleChange(null, "3");
												}}
											>
												{`Floor - ${singleFloor.text}`}
											</button>
										))}
										{floorOptions.length === 0 && <h2>Floor not allocated yet.</h2>}
									</div>
								</div>
							</TabPanel>
							<TabPanel value="3">
								<div className="zoneMainBtn">
									<div className="zoneDiv ">
										{zoneOption.map((singleZone) => (
											<button
												key={`${singleZone.key}`}
												className={`zoneButton ${singleZone.text === "A" && `green`} ${
													singleZone.text === "B" && `orange`
												} ${singleZone.text === "C" && `purple`} ${
													singleZone.text === "D" && `grey`
												}`}
												onClick={() => {
													onZoneNumberChange(singleZone.key);
													handleChange(null, "4");
												}}
											>
												{`F${floorNumber}/ ${singleZone.text}`}
											</button>
										))}
										{zoneOption.length === 0 && <h2>Zone not allocated yet.</h2>}
									</div>
								</div>
							</TabPanel>
							<TabPanel value="4">
								<div className="seatMainBtn">
									<div className="seatDiv ">
										{Object.keys(seatNumbersOptions).map((singleSeat) => (
											<button
												key={`${singleSeat}`}
												className={`seatButton ${
													seatNumbersOptions[singleSeat].booked == 0 ? `grey` : `black`
												}`}
												onClick={() => {
													onSeatNumbersChange(singleSeat);
												}}
												disabled={seatNumbersOptions[singleSeat].isDisabled}
											>
												{`F${floorNumber}/Z${zoneNumber}/${seatNumbersOptions[singleSeat].text}`}
											</button>
										))}
										{Object.keys(seatNumbersOptions).length === 0 && (
											<h2>Seats not allocated yet.</h2>
										)}
									</div>
									{Object.keys(seatNumbersOptions).length !== 0 && (
										<button className="btn save" onClick={OnSaveData}>
											Save
										</button>
									)}
								</div>
							</TabPanel>
						</TabContext>
					</Box>
				</div>
			</div>
		</div>
	);
}

export default BookingSpace;
