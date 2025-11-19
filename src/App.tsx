import {Grid, CssBaseline, ThemeProvider} from '@mui/material'
import {defaultTheme} from "./defaults/themes.ts";
import {AppHeader} from "@assets/main/AppHeader.tsx";
import {BrowserRouter} from "react-router";
import {AppRoutes} from "@assets/main/AppRoutes.tsx";


function App() {
	return (<ThemeProvider theme={defaultTheme}>
			<CssBaseline/>
			<BrowserRouter>
				<Grid container size={12}>
					<Grid size={12}>
						<AppHeader/>
					</Grid>
					<Grid size={12} container mx={2}>
						<AppRoutes/>
					</Grid>

				</Grid>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
