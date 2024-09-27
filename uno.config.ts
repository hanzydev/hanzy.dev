import {
    defineConfig,
    presetAttributify,
    presetUno,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss';
import presetAnimations from 'unocss-preset-animations';

export default defineConfig({
    presets: [presetAttributify(), presetUno(), presetAnimations()],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    theme: {
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
});
