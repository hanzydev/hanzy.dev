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

    <Animation v-if="showSnowflakes">
        <div class="fixed inset-0 w-full h-full pointer-events-none" ref="snowflakeContainerRef">
            <div
                ref="snowflakesRef"
                class="absolute bg-white rounded-full w-1 h-1"
                v-for="_ in snowflakeCount"
            ></div>
        </div>
    </Animation>

    <div class="pointer-events-none">
        <div
            ref="cursorRef"
            class="fixed opacity-0 z-[9999] bg-white bg-opacity-5 rounded-full w-9 h-9"
        ></div>
    </div>

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

const sees = ref(false);
const cursorRef = ref<HTMLDivElement>();
const cursorPosition = reactive({ x: 0, y: 0 });
const isHovering = ref(false);

const snowflakeContainerRef = ref<HTMLDivElement>();
const snowflakesRef = ref<HTMLDivElement[]>([]);
const snowflakeCount = ref(0);

const showSnowflakes = [11 /* December */, 0 /* January */, 1 /* February */].includes(
    new Date().getMonth(),
);
let snowflakeAnimators: gsap.core.Tween[] = [];

const onResize = () => {
    if (showSnowflakes) {
        snowflakeCount.value = Math.floor(
            window.innerWidth / (window.innerWidth <= 1366 ? 10 : 16),
        );
    }
};

const onMouseMove = (event: MouseEvent) => {
    if (showSnowflakes) {
        gsap.to(snowflakeContainerRef.value!, {
            x: gsap.utils.mapRange(0, 1, -100, 100, event.clientX / window.innerWidth),
            duration: 0.5,
            ease: 'sine.out',
        });
    }

    cursorPosition.x = event.clientX - cursorRef.value!.offsetWidth / 2;
    cursorPosition.y = event.clientY - cursorRef.value!.offsetHeight / 2;
};

const onMouseDown = () => {
    gsap.to(cursorRef.value!, {
        scale: isHovering.value ? 1.2 : 0.8,
        duration: 0.2,
    });
};

const onMouseUp = () => {
    gsap.to(cursorRef.value!, {
        scale: isHovering.value ? 1.5 : 1,
        duration: 0.2,
    });
};

onMounted(() => {
    onResize();

    document.body.addEventListener('resize', onResize);
    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mousedown', onMouseDown);
    document.body.addEventListener('mouseup', onMouseUp);
    document.body.addEventListener('mouseleave', () => (sees.value = false));
    document.body.addEventListener('mouseenter', () => (sees.value = true));
});

watch([cursorPosition, sees], ([_, sees]) => {
    if (sees) {
        const isHoveringLink = document.querySelector('a:hover');
        const isHoveringButton = document.querySelector('button:hover');

        isHovering.value = !!(isHoveringLink || isHoveringButton);
    }
});

watch(isHovering, (value) => {
    gsap.to(cursorRef.value!, {
        scale: value ? 1.5 : 1,
        duration: 0.2,
    });
});

watch(sees, (value) => {
    gsap.to(cursorRef.value!, {
        opacity: +value,
        duration: 0.2,
    });
});

watch(cursorPosition, (value) => {
    gsap.to(cursorRef.value!, {
        ...value,
        opacity: 1,
        duration: sees.value ? 0.2 : 0,
    });
});

watch(snowflakeCount, async () => {
    if (showSnowflakes) {
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
