import {Grid} from "@mui/material";
import {Outlet, Route, Routes} from "react-router";
import {MySkills} from "@assets/MySkills.tsx";

export function AppRoutes() {
	return (<Routes>
		<Route path={'*'}
		       element={<Grid container size={12}><Outlet/></Grid>}>
			<Route path={'index'} element={<MySkills/>}/>
		</Route>
	</Routes>)
}