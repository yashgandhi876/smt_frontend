import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import "../style/customCard.css"

function CustomCard(props) {
	return (
		<Card key={`${props.teamId}`} className="customCard" sx={{ maxWidth: 345 }}>
			<CardActionArea>
				<CardMedia component="img" height="140" image={require(`../img/${props.teamImg}`)} alt="Team Image" />
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{props.teamName} - {props.oeCode}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{`Handled by - ${props.teamManager}`}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{`Team Description - ${props.teamDescription}`}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="" color="primary" onClick={() => {props.onTeamNameChange(props.teamId, props.teamName); props.handleChange(null, "2")}}>
					Select
				</Button>
			</CardActions>
		</Card>
	);
}

export default CustomCard;
