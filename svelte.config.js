import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter({
            strict: false
        }),
		paths: {
			base: process.env.NODE_ENV === 'development' ? '' : '/Pool-viewer',
		}
	}
};

export default config;