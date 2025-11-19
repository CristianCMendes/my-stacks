import {defineConfig} from 'vite'
import configPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig((_mode) => {
	return {
		plugins: [react(), configPaths()],
		appType: 'spa',
		build: {
			rollupOptions: {
				output: {
					manualChunks: {
						'material-ui': ['@mui/material', '@mui/icons-material'],
						'react': ['react', 'react-dom', 'react-router']
					},
					entryFileNames: 'assets/[name].js',
					chunkFileNames: 'assets/[name].js',
					assetFileNames: 'assets/[name].[ext]'
				}
			}
		}
	}
})
