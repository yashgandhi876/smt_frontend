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
	const [teamData, setTeamData] = useState([
		{ teamId: 23, team: "Team CS", oeCode: "WM1", teamDescription: "BEST TEAM IN CS", managerName: "Yash Gandhi" },
		{ teamId: 23, team: "Team CS", oeCode: "WM1", teamDescription: "BEST TEAM IN CS", managerName: "Yash Gandhi" },
		{ teamId: 23, team: "Team CS", oeCode: "WM1", teamDescription: "BEST TEAM IN CS", managerName: "Yash Gandhi" },
		{ teamId: 23, team: "Team CS", oeCode: "WM1", teamDescription: "BEST TEAM IN CS", managerName: "Yash Gandhi" },
		{ teamId: 23, team: "Team CS", oeCode: "WM1", teamDescription: "BEST TEAM IN CS", managerName: "Yash Gandhi" },
	]);
	const [value, setValue] = useState("1");
	const [teamName, setTeamName] = useState("");
	const [floorNumber, setFloorNumber] = useState("");
	const [zoneNumber, setZoneNumber] = useState("");
	const [seatNumbers, setSeatNumbers] = useState([]);
	const [teamNameOption, setTeamNameOption] = useState([{ key: 1, text: "Team 1", value: 1 }]);
	const [floorOptions, setFloorOptions] = useState([
		{ key: 1, text: "1", value: 1 },
		{ key: 2, text: "2", value: 2 },
		{ key: 3, text: "3", value: 3 },
	]);
	const [zoneOption, setZoneOption] = useState([
		{ key: 1, text: "A", value: 1 },
		{ key: 2, text: "B", value: 2 },
		{ key: 3, text: "C", value: 3 },
		{ key: 4, text: "D", value: 4 },
	]);
	const [seatNumbersOptions, setSeatNumbersOptions] = useState([
		{ key: 1, text: 1, value: 1 },
		{ key: 2, text: 2, value: 2 },
		{ key: 3, text: 3, value: 3 },
		{ key: 4, text: 4, value: 4 },
		{ key: 5, text: 5, value: 5 },
	]);

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
		setTeamName(teamNameId);
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
				setSeatNumbersOptions(
					data.data.map((singleData) => ({
						key: singleData.id,
						text: singleData.id,
						value: singleData.id,
					}))
				);
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

	const onSeatNumbersChange = (event) => {
		setSeatNumbers([...seatNumbers, ...event.target.value]);
	};

	const OnSaveData = (event) => {
		const bookingData = {
			teamName,
			floorNumber,
			zoneNumber,
			seatNumbers,
		};

		axios
			.post(`http://localhost:8080/saveData`, bookingData)
			.then((data) => {
				setZoneOption(
					data.data.map((singleData) => ({
						key: singleData.id,
						text: singleData.floorNumber,
						value: singleData.id,
					}))
				);
				toast.success("Saved Data successfully!", {
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
				toast.error("Failed to save data", {
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
											teamName={`${team.team}`}
											oeCode={`${team.oeCode}`}
											teamDescription={`${team.teamDescription}`}
											teamImg={`team${Math.floor(Math.random() * 9) + 1}.png`}
											teamManager={`${team.managerName}`}
											teamId={`${team.teamId}`}
											onTeamNameChange={onTeamNameChange}
											handleChange={handleChange}
										/>
									))}
								</div>
							</TabPanel>
							<TabPanel value="2">
								<div className="floorMainBtn">
									<div className="floorDiv">
										{floorOptions.map((singleFloor) => (
											<button
												className="floorButton"
												onClick={() => {
													onFloorNumberChange(singleFloor.id);
												}}
											>
												{`Floor - ${singleFloor.text}`}
											</button>
										))}
									</div>
								</div>
							</TabPanel>
							<TabPanel value="3">
								<div className="zoneMainBtn">
									<div className="zoneDiv ">
										{zoneOption.map((singleZone) => (
											<button
												className={`zoneButton ${singleZone.text === "A" && `green`} ${
													singleZone.text === "B" && `orange`
												} ${singleZone.text === "C" && `purple`} ${
													singleZone.text === "D" && `grey`
												}`}
												onClick={() => {
													onZoneNumberChange(singleZone.id);
												}}
											>
												{`Zone - ${singleZone.text}`}
											</button>
										))}
									</div>
								</div>
							</TabPanel>
							<TabPanel value="4">
								<button className="btn save" onClick={OnSaveData}>
									Save
								</button>
							</TabPanel>
						</TabContext>
					</Box>
				</div>
			</div>
		</div>
	);
}

export default BookingSpace;
