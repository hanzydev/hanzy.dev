<template>
    <div>
        <Head>
            <Title>Skills</Title>
            <Meta property="og:title" content="Skills | Hanzy" />
        </Head>

        <Container class="space-y-4">
            <h2 class="text-3xl font-bold md:text-4xl">Skills 🛠️</h2>

            <div
                class="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5"
            >
                <a
                    v-for="(skill, index) in skills"
                    :key="index"
                    class="group relative flex h-36 w-full cursor-pointer flex-col items-center justify-center space-y-2 overflow-hidden rounded-lg border border-indigo-900 bg-primary transition-all hover:scale-105 hover:bg-secondary active:scale-95 sm:h-32"
                    :aria-label="skill.name"
                    :href="skill.href"
                    target="_blank"
                >
                    <Icon
                        :name="skill.icon"
                        size="64"
                        class="transition-transform group-hover:-translate-y-[12px]"
                    />
                    <p
                        class="absolute bottom-3 translate-y-[10px] text-sm font-medium opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                    >
                        {{ skill.name }}
                    </p>
                </a>
            </div>
        </Container>
    </div>
</template>

<script setup lang="ts">
import skills from '@/data/skills.json';
</script>
