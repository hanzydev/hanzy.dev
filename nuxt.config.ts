// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxtjs/google-fonts', 'nuxt-lodash'],
    srcDir: 'src',
    devtools: {
        enabled: true,
    },
    googleFonts: {
        families: {
            Inter: [400, 500, 600, 700, 800],
            'Roboto Mono': [400, 500, 600, 700, 800],
        },
    },
    tailwindcss: {
        cssPath: '@/styles/main.css',
        configPath: 'tailwind.config.js',
    },
    vue: {
        propsDestructure: true,
    },
    experimental: {
        inlineSSRStyles: false,
    },
    app: {
        head: {
            meta: [
                {
                    name: 'author',
                    content: 'Hànzy',
                },
                {
                    name: 'theme-color',
                    content: '#7d6bd2',
                },
            ],
            link: [
                {
                    rel: 'icon',
                    href: '/favicon.ico',
                },
            ],
            htmlAttrs: {
                lang: 'en',
            },
        },
    },
});