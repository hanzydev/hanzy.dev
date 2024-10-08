// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    future: { compatibilityVersion: 4 },
    devtools: { enabled: true },

    modules: ['@nuxt/eslint', '@nuxt/fonts', '@nuxt/icon', '@vueuse/nuxt', '@unocss/nuxt'],

    css: ['@unocss/reset/tailwind.css', '~/styles/main.css'],

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

    compatibilityDate: '2024-09-27',
});
