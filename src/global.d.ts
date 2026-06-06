// Global type declarations for non-code imports
declare module '*.css';
declare module '*.scss';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

interface ImportMetaEnv {
	readonly VITE_EMAILJS_PUBLIC_KEY?: string
	readonly VITE_EMAILJS_SERVICE_ID?: string
	readonly VITE_EMAILJS_TEMPLATE_ID?: string
	readonly VITE_EMAILJS_DESTINATION_EMAIL?: string
	readonly VITE_USE_SERVER_EMAIL?: string
	readonly VITE_SERVER_URL?: string
	// add other env vars here
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
