<template>
    <div>
        <Head>
            <Title>Get in touch</Title>
            <Meta property="og:title" content="Get in touch | Hanzy" />
        </Head>

        <Container space-y-4>
            <div space-y-2>
                <h2 text-3xl font-bold md:text-4xl>Get in touch 📧</h2>

                <p text-slate-400 font-medium>
                    I'm open to new opportunities, so if you have any questions or just want to say
                    hello, don't hesitate to get in touch with me.
                </p>
            </div>

            <div grid="~ gap4 sm:cols-2 xl:cols-3" wfull>
                <a
                    v-for="(link, index) in links"
                    :key="index"
                    border="~ indigo-900"
                    flex="~ items-center gap4"
                    h24
                    wfull
                    cursor-none="!"
                    rounded-lg
                    bg-primary
                    p="y-4 x-6"
                    transition-all
                    active:scale-95
                    hover="scale-105 bg-secondary"
                    :aria-label="link.name"
                    :href="link.href"
                    target="_blank"
                >
                    <Icon :name="link.icon" size="48" />
                    <div>
                        <p font-medium>
                            {{ link.name }}
                        </p>
                        <p text-sm text-indigo-500 font-medium>
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
