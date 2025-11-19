import {
	FormControlLabel,
	FormGroup,
	Grid,
	MenuItem,
	Switch,
	TextField,
	useColorScheme
} from "@mui/material";
import {DarkMode, LightMode} from "@mui/icons-material";

export function ThemeSelector({variant}: { variant?: 'select' | 'slider' }) {
	return {
		'select': <SelectThemeSelector/>,
		'slider': <SliderThemeSelector/>
	}[variant ?? 'slider']
}


function SelectThemeSelector() {
	const {mode, setMode} = useColorScheme()

	const CurrentIcon = mode !== 'light' ? <LightMode/> : <DarkMode/>

	return (<TextField select
	                   value={mode}
	                   onChange={(e) => setMode(e.target.value as 'light' | 'dark' | 'system')}
	                   label={<Grid container alignItems={'center'}>Tema{CurrentIcon}</Grid>}>
		<MenuItem value={'system'}>Sistema</MenuItem>
		<MenuItem value={'light'}>Claro</MenuItem>
		<MenuItem value={'dark'}>Escuro</MenuItem>
	</TextField>)
}

function SliderThemeSelector() {
	const {mode, setMode} = useColorScheme()
	const checked = mode === 'dark'

	return (
		<FormGroup>
			<FormControlLabel
				control={
					<Switch
						checked={checked}
						onChange={(_e, v) => setMode(!v ? 'light' : 'dark')}
						icon={<LightMode fontSize={'small'}/>}
						checkedIcon={<DarkMode fontSize={'small'}/>}
					/>
				}
				label="Tema"
			/>
		</FormGroup>

	)
}