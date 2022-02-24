import { Button } from "@mui/material";
import {GiConfirmed} from 'react-icons/gi';

export default function ButtonSubmit(props) {
	return (
		<Button startIcon={<GiConfirmed color="green" fontSize="small" />} {...props}>
			Confirmer
		</Button>
	);
}
