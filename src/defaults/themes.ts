import {createTheme} from "@mui/material";

export const defaultTheme = createTheme({
	shape: {
		borderRadius: 2
	},
	components: {
		MuiTextField: {
			defaultProps: {
				fullWidth: true,
				variant: 'filled'
			}
		}
	},
	colorSchemes: {
		dark: {
			palette: {
				mode: 'dark',
				background: {
					default: '#212121',
				}
			}
		},
		light: {
			palette: {
				mode: 'light',
				background: {
					default: '#bdbdbd',
				}
			}
		}
	}
});

