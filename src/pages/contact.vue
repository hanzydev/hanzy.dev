<template>
    <div class="pt-36" />
    <Container>
        <ScrollAnimation transformX="left">
            <h1 class="font-robotomono font-bold text-4xl">/contact</h1>
            <p class="mt-3 text-gray-300">
                I'm currently open to new opportunities, if you have any questions or just want to
                say hi, feel free to contact me.
            </p>
        </ScrollAnimation>

        <ScrollAnimation>
            <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                <RippleEffect
                    v-for="(link, index) in links"
                    class="bg-[rgba(0,0,0,0.2)] backdrop-blur-md h-24 w-full rounded-xl cursor-pointer opacity-0"
                    :key="index"
                    :data-contact="link.name"
                    @mouseenter="onHover(link.name)"
                    @mouseleave="onLeave(link.name)"
                    @touchstart="onHover(link.name)"
                    @touchend="onLeave(link.name)"
                >
                    <a
                        class="space-x-4 flex items-center px-6 w-full h-full rounded-xl"
                        :aria-label="link.name"
                        :href="link.href"
                        @click.prevent="onClick(link.href)"
                    >
                        <Icon :icon="link.icon" class="w-12 h-12" />
                        <div>
                            <p class="font-robotomono font-medium">
                                {{ link.name }}
                            </p>
                            <p class="font-robotomono font-medium text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500">
                                {{ link.alt }}
                            </p>
                        </div>
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
import links from '@/data/links.json';

const onHover = (contactName: string) => {
    gsap.to(`[data-contact="${contactName}"]`, {
        opacity: 1,
        duration: 0.3,
        y: -5,
        ease: 'power2.out',
    });
};

const onLeave = (contactName: string) => {
    gsap.to(`[data-contact="${contactName}"]`, {
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
        '[data-contact]',
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
    title: 'Contact',
    meta: [
        {
            property: 'og:title',
            content: 'Contact - Hànzy',
        },
    ],
});
</script>
