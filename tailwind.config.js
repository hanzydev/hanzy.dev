/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./**/*.vue'],
    theme: {
        extend: {
            screens: {
                xs: '448px',
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
                robotomono: ['Roboto Mono', 'monospace'],
            },
        },
    },
    plugins: [],
};
