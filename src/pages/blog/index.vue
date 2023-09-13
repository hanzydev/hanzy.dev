<template>
    <div class="pt-36" />
    <Container>
        <Animation transformX="left">
            <h1 class="font-robotomono font-bold text-4xl">/blog</h1>
            <p class="mt-3 text-gray-300">I like to share what I know with other people.</p>
        </Animation>

        <Animation>
            <div class="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                <RippleEffect
                    v-for="(blog, index) in blogs"
                    class="bg-[rgba(0,0,0,0.2)] backdrop-blur-md w-full rounded-xl cursor-pointer opacity-0"
                    :key="index"
                    :data-blog="blog.title"
                    @mouseenter="onHover(blog.title)"
                    @mouseleave="onLeave(blog.title)"
                    @touchstart="onHover(blog.title)"
                    @touchend="onLeave(blog.title)"
                >
                    <a
                        class="w-full h-full rounded-xl"
                        :aria-label="blog.title"
                        :href="blog.to"
                        @click.prevent="onClick(blog.to)"
                    >
                        <div
                            class="w-full bg-no-repeat bg-cover bg-center select-none h-44"
                            :alt="blog.title"
                            :style="{
                                backgroundImage: `url(${blog.thumbnail})`,
                            }"
                        />

                        <div class="flex flex-col space-y-2 p-4">
                            <h3 class="font-semibold text-xl">
                                {{ blog.title }}
                            </h3>
                            <p class="text-gray-300 text-sm">{{ blog.description }}</p>
                        </div>
                    </a>
                </RippleEffect>
            </div>
        </Animation>
    </Container>
    <div class="flex-grow" />
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { resolveDate } from '@/util/resolveDate';
import { wait } from '@/util/wait';

const { data } = await useAsyncData('docs', () => queryContent().find());

interface Blog {
    title: string;
    description: string;
    thumbnail: string;
    to: string;
    date: string;
}

const blogs = computed(() => {
    if (!Array.isArray(data.value)) {
        return [];
    }

    return data.value.map((blog) => {
        const resolved = {
            title: blog.title,
            description: blog.description,
            thumbnail: blog.thumbnail,
            author: blog.author,
            to: blog._path,
            date: '',
        };

        const rawDate = blog.date;

        if (rawDate.includes('|')) {
            const chunks = rawDate.split('|').map((c: string) => c.trim());
            resolved.date = resolveDate(chunks[0], chunks[1]);
        } else {
            resolved.date = resolveDate(rawDate);
        }

        return resolved as Blog;
    });
});

const router = useRouter();

const onHover = (blogTitle: string) => {
    gsap.to(`[data-blog="${blogTitle}"]`, {
        opacity: 1,
        duration: 0.3,
        y: -5,
        ease: 'power2.out',
    });
};

const onLeave = (blogTitle: string) => {
    gsap.to(`[data-blog="${blogTitle}"]`, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
    });
};

const onClick = async (blogPath: string) => {
    await wait(300);
    router.push(blogPath);
};

onMounted(() => {
    gsap.fromTo(
        '[data-blog]',
        {
            opacity: 0,
            y: 20,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            delay: 0.5,
            ease: 'power4.out',
        },
    );
});

useHead({
    title: 'Blog',
    meta: [
        {
            property: 'og:title',
            content: 'Blog - Hanzy',
        },
        {
            name: 'description',
            content: 'Here are my blog.',
        },
        {
            property: 'og:description',
            content: 'Here are my blog.',
        },
    ],
});
</script>
