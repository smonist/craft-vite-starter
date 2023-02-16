import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import liveReload from "vite-plugin-live-reload";
import critical from "rollup-plugin-critical";
import viteCompression from "vite-plugin-compression";
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default ({ command }) =>
	defineConfig({
		base: command === "serve" ? "" : "/dist/",
		build: {
			emptyOutDir: true,
			manifest: true,
			outDir: "./web/dist/",
			rollupOptions: {
				input: {
					app: "./src/ts/app.ts",
				},
			},
		},
		server: {
			host: "0.0.0.0",
			port: 3000,
		},
		plugins: [
			WindiCSS(),
			liveReload(["./templates/**/*"]),
			legacy({
				targets: ["defaults", "ie >= 11"],
				additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
			}),
			critical({
				criticalUrl: "http://localhost",
				criticalBase: "./web/dist/criticalcss/",
				criticalPages: [{ uri: "/", template: "index" }],
				criticalConfig: {},
			}),
			viteCompression(),
		],
	});
