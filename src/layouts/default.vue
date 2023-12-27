<template>
    <Animation>
        <img
            src="/gradient-top.png"
            alt="gradient top"
            class="fixed min-h-screen w-full -z-[1]"
            draggable="false"
        />
    </Animation>

    <Animation>
        <img
            src="/gradient-bottom.png"
            alt="gradient bottom"
            class="fixed min-h-screen w-full -z-[1]"
            draggable="false"
        />
    </Animation>

    <Animation>
        <div class="fixed inset-0 w-full h-full pointer-events-none" ref="snowflakeContainerRef">
            <div
                ref="snowflakesRef"
                class="absolute bg-white rounded-full w-1 h-1"
                v-for="_ in snowflakeCount"
            ></div>
        </div>
    </Animation>

    <div class="flex flex-col min-h-screen w-full">
        <Navbar />
        <slot />
        <Animation>
            <Footer />
        </Animation>
    </div>
</template>

<script setup lang="ts">
import '@/styles/main.css';

import gsap from 'gsap';

const snowflakeContainerRef = ref<HTMLDivElement>();
const snowflakesRef = ref<HTMLDivElement[]>([]);
const snowflakeCount = ref(0);

let snowflakeAnimators: gsap.core.Tween[] = [];

const onResize = () => {
    snowflakeCount.value = Math.floor(window.innerWidth / (window.innerWidth <= 1366 ? 10 : 16));
};

const onMouseMove = (event: MouseEvent) => {
    gsap.to(snowflakeContainerRef.value!, {
        x: gsap.utils.mapRange(0, 1, -100, 100, event.clientX / window.innerWidth),
        duration: 0.5,
        ease: 'sine.out',
    });
};

onMounted(() => {
    onResize();
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
});

watch(snowflakeCount, async () => {
    snowflakeAnimators.forEach((animator) => animator.kill());
    snowflakeAnimators = [];

    await nextTick();

    for (const snowflake of snowflakesRef.value) {
        const animationSpeed = gsap.utils.random(4.5, 8);
        const opacity = gsap.utils.random(0.35, 0.9);

        gsap.set(snowflake, {
            x: gsap.utils.random(0, window.innerWidth),
            y: gsap.utils.random(-200, -150),
            z: gsap.utils.random(-200, 200),
            scale: gsap.utils.random(1, 2.5),
            opacity,
            filter: `blur(${opacity}px)`,
        });

        snowflakeAnimators.push(
            gsap.to(snowflake, {
                duration: animationSpeed,
                y: window.innerHeight + 100,
                ease: 'none',
                repeat: -1,
                delay: -15,
            }),
        );

        snowflakeAnimators.push(
            gsap.to(snowflake, {
                duration: animationSpeed - 1,
                x: `+=${gsap.utils.random(-50, 200)}`,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            }),
        );
    }
});

useHead({
    htmlAttrs: {
        class: 'scroll-smooth',
    },
    bodyAttrs: {
        class: 'text-white bg-black overflow-x-hidden font-inter',
    },
});
</script>
