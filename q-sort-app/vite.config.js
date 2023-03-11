import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
	// base: process.env.NODE_ENV === "production" ? "/Q-SortApp/" : "/",
	base: "/",
	plugins: [vue()],
	server: {
		watch:{
			usePolling: true
		}
	}
})
