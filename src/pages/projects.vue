<template>
    <div class="pt-36" />
    <Container>
        <ScrollAnimation transformX="left">
            <h1 class="font-robotomono font-bold text-4xl">/projects</h1>
        </ScrollAnimation>

        <ScrollAnimation>
            <div class="mt-6 grid xl:grid-cols-2 gap-6 w-full">
                <RippleEffect
                    v-for="(project, index) in projects"
                    class="bg-[rgba(0,0,0,0.2)] backdrop-blur-md h-40 w-full rounded-xl cursor-pointer opacity-0"
                    :key="index"
                    :data-project="project.name"
                    @mouseenter="onHover(project.name)"
                    @mouseleave="onLeave(project.name)"
                    @touchstart="onHover(project.name)"
                    @touchend="onLeave(project.name)"
                >
                    <a
                        class="flex flex-col p-4 w-full h-full rounded-xl justify-between"
                        :aria-label="project.name"
                        :href="project.url"
                        @click.prevent="onClick(project.url)"
                    >
                        <div>
                            <p class="text-md font-bold m-0 font-robotomono">{{ project.name }}</p>
                            <p class="text-sm font-robotomono text-gray-300 mt-3">
                                {{
                                    project.description.length > 85
                                        ? project.description.slice(0, 82) + '...'
                                        : project.description
                                }}
                            </p>
                        </div>
                        <div class="flex mt-auto m-0 gap-2">
                            <button
                                class="flex text-gray-300 py-1 px-2 gap-2 rounded-lg items-center font-robotomono text-sm"
                                style="background-color: rgba(0, 0, 0, 0.2)"
                            >
                                <IconsGithubStar />
                                {{ project.stars }}
                            </button>
                            <button
                                class="flex text-gray-300 py-1 px-2 gap-2 rounded-lg items-center font-robotomono text-sm"
                                style="background-color: rgba(0, 0, 0, 0.2)"
                            >
                                <IconsGithubFork />
                                {{ project.forks }}
                            </button>
                            <button
                                class="flex text-gray-300 py-1 px-2 gap-2 rounded-lg items-center font-robotomono text-sm max-sm:hidden"
                                style="background-color: rgba(0, 0, 0, 0.2)"
                            >
                                <IconsGithubLicense />
                                {{
                                    typeof project.license === 'string'
                                        ? project.license
                                        : project.license.name
                                }}
                            </button>
                            <button
                                class="flex text-gray-300 py-1 px-2 gap-2 rounded-lg items-center ml-auto font-robotomono text-sm"
                                style="background-color: rgba(0, 0, 0, 0.2)"
                            >
                                <IconsGithubLanguage />
                                {{ project.language }}
                            </button>
                        </div>
                    </a>
                </RippleEffect>
            </div>
        </ScrollAnimation>
    </Container>
    <div class="flex-grow" />
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { wait } from '@/util/wait';

const { data: projects } = await useFetch('/api/repositories');

const onHover = (projectName: string) => {
    gsap.to(`[data-project="${projectName}"]`, {
        opacity: 1,
        duration: 0.3,
        y: -5,
        ease: 'power2.out',
    });
};

const onLeave = (projectName: string) => {
    gsap.to(`[data-project="${projectName}"]`, {
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
        '[data-project]',
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
    title: 'Projects',
    meta: [
        {
            property: 'og:title',
            content: 'Projects - Hànzy',
        },
        {
            name: 'description',
            content: 'Here are my projects.',
        },
        {
            property: 'og:description',
            content: 'Here are my projects.',
        },
    ],
});
</script>
