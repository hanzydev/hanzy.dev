<template>
    <div v-if="data">
        <div class="pt-36" />
        <Container>
            <ScrollAnimation transformX="left">
                <h1 class="font-robotomono font-bold text-4xl">{{ data.title }}</h1>
                <p class="mt-3 text-gray-300">{{ data.description }} • {{ date }}</p>
            </ScrollAnimation>

            <ScrollAnimation transformY="bottom" class="mt-6">
                <ContentRenderer id="blog-content" :value="data!" />
                <RippleEffect class="flex justify-center mt-12 rounded-2xl">
                    <NuxtLink
                        to="/blog"
                        type="button"
                        role="button"
                        class="py-3 px-5 rounded-2xl bg-[rgba(0,0,0,0.2)] backdrop-blur-md text-gray-300 hover:text-white hover:bg-[rgba(0,0,0,0.3)] transition-colors duration-300"
                    >
                        View other posts
                    </NuxtLink>
                </RippleEffect>
            </ScrollAnimation>
        </Container>
    </div>
    <Error
        message="The blog you're looking for doesn't exist."
        :statusCode="404"
        :button="{
            text: 'Go back to blog',
            to: '/blog',
        }"
        v-else
    />
    <div class="flex-grow" />
</template>

<script setup lang="ts">
import { h, render } from 'vue';
import { Icon } from '@iconify/vue';
import { resolveDate } from '@/util/resolveDate';

const route = useRoute();

const { data } = await useAsyncData('docs', () =>
    queryContent(`/blog/${route.params.slug}`).findOne(),
);

const date = computed(() => {
    if (data.value) {
        const rawDate = data.value.date;

        if (!rawDate) {
            return 'Unknown Date';
        }

        if (rawDate.includes('|')) {
            const chunks = rawDate.split('|').map((c: string) => c.trim());
            return resolveDate(chunks[0], chunks[1]);
        } else {
            return resolveDate(rawDate);
        }
    }

    return 'Unknown Date';
});

if (data.value) {
    useHead({
        title: data.value.title,
        meta: [
            {
                property: 'og:title',
                content: data.value.title,
            },
            {
                name: 'description',
                content: data.value.description,
            },
            {
                property: 'og:description',
                content: data.value.description,
            },
        ],
    });

    onMounted(() => {
        const links = document.querySelectorAll<HTMLLinkElement>('#blog-content a');
        const tables = document.querySelectorAll<HTMLTableElement>('#blog-content table');
        const codes = document.querySelectorAll<HTMLElement>('#blog-content pre code');

        links.forEach((link) => {
            link.classList.add('link', 'before:origin-left');

            if (!link.href.replace(new URL(document.URL).origin, '').startsWith('/')) {
                link.target = '_blank';
            }
        });

        tables.forEach((table) => {
            const parentElement = document.createElement('div');

            parentElement.classList.add('overflow-auto', 'w-full');

            table.parentElement?.replaceChild(parentElement, table);
            parentElement.appendChild(table);
        });

        codes.forEach((code) => {
            const pre = code.parentElement!;

            pre.classList.add('relative', 'group');

            const copyButtonVNode = h(
                'button',
                {
                    class: 'absolute top-4 right-4 flex items-center justify-center text-center w-10 h-10 rounded-lg bg-[rgba(0,0,0,0.1)] backdrop-blur-md text-gray-300 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 text-sm',

                    onClick: async () => {
                        await navigator.clipboard.writeText(code.innerText);

                        const btn = pre.querySelector('button')!;
                        const icons = btn.querySelectorAll('svg');

                        btn.classList.add('cursor-not-allowed');
                        btn.disabled = true;

                        icons[0].classList.add('hidden');
                        icons[1].classList.remove('hidden');

                        setTimeout(() => {
                            btn.classList.remove('cursor-not-allowed');
                            btn.disabled = false;

                            icons[0].classList.remove('hidden');
                            icons[1].classList.add('hidden');
                        }, 2000);
                    },
                },
                [
                    h(Icon, {
                        icon: 'lucide:clipboard',
                        class: 'w-5 h-5',
                    }),
                    h(Icon, {
                        icon: 'lucide:clipboard-check',
                        class: 'w-5 h-5 hidden',
                    }),
                ],
            );

            render(copyButtonVNode, pre);
        });
    });
} else {
    useHead({
        title: '404 - Not Found',
        meta: [
            {
                property: 'og:title',
                content: '404 - Not Found',
            },
            {
                name: 'description',
                content: "The blog you're looking for doesn't exist.",
            },
            {
                property: 'og:description',
                content: "The blog you're looking for doesn't exist.",
            },
        ],
    });
}
</script>

<style>
#blog-content h1 {
    @apply font-bold mt-8 mb-4 text-4xl;
}

#blog-content h2 {
    @apply font-bold mt-8 mb-4 text-3xl;
}

#blog-content h3 {
    @apply font-semibold mt-8 mb-4 text-2xl;
}

#blog-content h4 {
    @apply font-semibold mt-8 mb-4 text-xl;
}

#blog-content h5 {
    @apply font-semibold mt-8 mb-4 text-lg;
}

#blog-content h6 {
    @apply font-medium mt-8 mb-4 text-base;
}

#blog-content p {
    @apply my-4 text-gray-300 text-base;
}

#blog-content ul {
    @apply my-4 text-gray-300 text-base list-disc pl-8;
}

#blog-content li {
    @apply my-2;
}

#blog-content ol {
    @apply my-4 text-gray-300 text-base list-decimal pl-8;
}

#blog-content a {
    @apply my-4 text-transparent text-white;
}

#blog-content blockquote {
    @apply my-4 text-gray-300 text-base;
}

#blog-content pre {
    @apply rounded-xl p-4 overflow-auto my-4 bg-[rgba(0,0,0,0.2)] backdrop-blur-md;
}

#blog-content table {
    @apply border-collapse table-auto rounded-xl bg-[rgba(0,0,0,0.2)] backdrop-blur-md;
}

#blog-content table thead tr th {
    @apply text-left;
}

#blog-content table thead tr th {
    @apply px-4 py-2;
}

#blog-content table tbody td {
    @apply px-4 py-2 border-t border-[rgba(255,255,255,0.05)] text-gray-300;
}
</style>
