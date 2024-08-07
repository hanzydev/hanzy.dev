import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default <Config>{
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    theme: {
        extend: {
            colors: {
                background: 'black',
                foreground: '#0a091f',
                primary: '#131326',
                secondary: '#1d1c32',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [animate],
};
