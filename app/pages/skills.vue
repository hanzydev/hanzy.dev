<template>
    <div>
        <Head>
            <Title>Skills</Title>
            <Meta property="og:title" content="Skills | Hanzy" />
        </Head>

        <Container space-y-4>
            <h2 text-3xl font-bold md:text-4xl>Skills 🛠️</h2>

            <div grid="~ cols-2 sm:cols-4 lg:cols-5 gap4" wfull>
                <a
                    v-for="(skill, index) in skills"
                    :key="index"
                    class="group"
                    relative
                    h36
                    wfull
                    flex="~ col items-center justify-center"
                    cursor-none="!"
                    overflow-hidden
                    border="~ indigo-900"
                    rounded-lg
                    bg-primary
                    transition-all
                    sm:h32
                    active:scale-95
                    hover="scale-105 bg-secondary"
                    :aria-label="skill.name"
                    :href="skill.href"
                    target="_blank"
                >
                    <Icon
                        :name="skill.icon"
                        size="64"
                        transition-transform
                        group-hover:-translate-y-12px
                    />
                    <p
                        absolute
                        bottom-3
                        translate-y-10px
                        text-sm
                        font-medium
                        opacity-0
                        transition-all
                        group-hover="translate-y-0 opacity-100"
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
