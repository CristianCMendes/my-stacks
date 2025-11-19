import {Grid, Link, Toolbar} from "@mui/material";
import {ThemeSelector} from "@assets/main/ThemeSelector.tsx";
import {Link as RouterLink} from 'react-router'

export function AppHeader() {
	return (<Toolbar>
		<Grid size={{xs: 12, md: 3}}>
			<Link component={RouterLink} to={{pathname: '/index'}}>Inicio</Link>
		</Grid>
		<Grid size={{xs: 12, md: 6}}>
			<ThemeSelector/>
		</Grid>

	</Toolbar>)
}