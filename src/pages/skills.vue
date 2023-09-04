<template>
    <div class="pt-36" />
    <Container>
        <ScrollAnimation transformX="left">
            <h1 class="font-robotomono font-bold text-4xl">/skills</h1>
        </ScrollAnimation>

        <ScrollAnimation>
            <div
                class="mt-6 grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-6 w-full"
            >
                <RippleEffect
                    v-for="(skill, index) in skills"
                    class="bg-[rgba(0,0,0,0.2)] backdrop-blur-md h-36 sm:h-32 w-full rounded-xl cursor-pointer opacity-0"
                    :key="index"
                    :data-skill="skill.name"
                    @mouseenter="onHover(skill.name)"
                    @mouseleave="onLeave(skill.name)"
                    @touchstart="onHover(skill.name)"
                    @touchend="onLeave(skill.name)"
                >
                    <a
                        class="overflow-hidden relative space-y-2 flex flex-col items-center justify-center w-full h-full rounded-xl"
                        :aria-label="skill.name"
                        :href="skill.href"
                        @click.prevent="onClick(skill.href)"
                    >
                        <Icon :icon="skill.icon" class="w-16 h-16" data-skill-icon />
                        <p
                            class="hidden absolute bottom-3 font-robotomono text-sm font-medium"
                            data-skill-name
                        >
                            {{ skill.name }}
                        </p>
                    </a>
                </RippleEffect>
            </div>
        </ScrollAnimation>
    </Container>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { Icon } from '@iconify/vue';
import { wait } from '@/util/wait';
import skills from '@/data/skills.json';

const onHover = (skillName: string) => {
    gsap.fromTo(
        `[data-skill="${skillName}"] [data-skill-name]`,
        {
            display: 'none',
            opacity: 0,
            y: 20,
        },
        {
            display: 'block',
            opacity: 1,
            duration: 0.3,
            y: 0,
            ease: 'power2.out',
        },
    );

    gsap.to(`[data-skill="${skillName}"] [data-skill-icon]`, {
        y: -12,
        duration: 0.3,
        ease: 'power2.out',
    });
};

const onLeave = (skillName: string) => {
    gsap.to(`[data-skill="${skillName}"] [data-skill-name]`, {
        display: 'none',
        opacity: 0,
        duration: 0.3,
        y: 20,
        ease: 'power2.out',
    });

    gsap.to(`[data-skill="${skillName}"] [data-skill-icon]`, {
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
    });
};

const onClick = async (href: string) => {
    await wait(300);
    window.open(href, '_blank');
};

onMounted(() => {
    gsap.fromTo(
        '[data-skill]',
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
    title: 'Skills',
    meta: [
        {
            property: 'og:title',
            content: 'Skills | Hànzy',
        },
    ],
});
</script>
