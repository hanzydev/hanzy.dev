// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    future: { compatibilityVersion: 4 },
    devtools: { enabled: true },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxt/eslint',
        '@nuxt/fonts',
        'nuxt-icon',
        '@vueuse/nuxt',
    ],
    tailwindcss: {
        cssPath: '@/styles/main.css',
    },
    fonts: {
        families: [
            {
                name: 'Inter',
                provider: 'google',
            },
        ],
    },
    vue: {
        propsDestructure: true,
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            htmlAttrs: {
                lang: 'en',
            },
            meta: [
                {
                    name: 'theme-color',
                    content: '#6366f1',
                },
            ],
        },
    },
});
