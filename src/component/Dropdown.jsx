import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import "../style/BookingSpace.css";

function Dropdown(props) {
	return (
		<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
			<InputLabel id={`${props.labelId}`}>{props.label}</InputLabel>
			<Select
				className={`dropdown ${props.classNameDropDown}`}
				labelId={`${props.labelId}`}
				id={`${props.floorname}`}
				value={props.dropDownValue}
				label={`${props.dropdownlabel}`}
				onChange={props.onDropdownChange}
				placeholder={`${props.dropDownPlaceholder}`}
                multiple={props.multiple}
			>
				{props.options.map((option) => (
					<MenuItem key={option.key} value={option.value}>{option.text}</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default Dropdown;
