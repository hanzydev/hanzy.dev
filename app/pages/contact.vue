<template>
    <div>
        <Head>
            <Title>Get in touch</Title>
            <Meta property="og:title" content="Get in touch | Hanzy" />
        </Head>

        <Container class="space-y-4">
            <div class="space-y-2">
                <h2 class="text-3xl font-bold md:text-4xl">Get in touch 📧</h2>

                <p class="font-medium text-slate-400">
                    I'm open to new opportunities, so if you have any questions
                    or just want to say hello, don't hesitate to get in touch
                    with me.
                </p>
            </div>

            <div class="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <a
                    v-for="(link, index) in links"
                    :key="index"
                    class="flex h-24 w-full cursor-pointer items-center gap-4 rounded-lg border border-indigo-900 bg-primary p-4 px-6 transition-all hover:scale-105 hover:bg-secondary active:scale-95"
                    :aria-label="link.name"
                    :href="link.href"
                    target="_blank"
                >
                    <Icon :name="link.icon" size="48" />
                    <div>
                        <p class="font-medium">
                            {{ link.name }}
                        </p>
                        <p class="text-sm font-medium text-indigo-500">
                            {{ link.alt }}
                        </p>
                    </div>
                </a>
            </div>
        </Container>
    </div>
</template>

<script setup lang="ts">
import links from '@/data/links.json';
</script>
