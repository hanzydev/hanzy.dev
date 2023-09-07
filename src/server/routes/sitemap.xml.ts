import { serverQueryContent } from '#content/server';

const pages = [
    {
        path: '/',
        priority: 1.0,
    },
    {
        path: '/skills',
        priority: 0.8,
    },
    {
        path: '/projects',
        priority: 0.8,
    },
    {
        path: '/contact',
        priority: 0.8,
    },
    {
        path: "/blog",
        priority: 0.8,
    }
];

const BASE_SITEMAP = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    {PAGES}
    {BLOG_POSTS}
</urlset>`;

export default defineEventHandler(async (event) => {
    const docs = await serverQueryContent(event).find();
    const lastmod = new Date().toISOString();

    const pagesConverted = pages.map(
        (page) => `
            <url>
                <loc>https://hanzy.dev${page.path}</loc>
                <lastmod>${lastmod}</lastmod>
                <priority>${page.priority}</priority>
            </url>`,
    );
    const postsConverted = docs.map(
        (doc) => `
            <url>
                <loc>https://hanzy.dev${doc._path}</loc>
                <lastmod>${lastmod}</lastmod>
                <priority>0.5</priority>
            </url>`,
    );

    const sitemap = BASE_SITEMAP.replace('{PAGES}', pagesConverted.join('')).replace(
        '{BLOG_POSTS}',
        postsConverted.join(''),
    );

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'text/xml',
        },
    });
});
