import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        appDir: 'web',
        adapter: adapter(),
        paths: {
            base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
        }
    },
    preprocess: vitePreprocess()
};
export default config;