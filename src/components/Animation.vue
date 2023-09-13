<template>
    <div class="opacity-0" ref="elementRef">
        <slot />
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';

const {
    fade = true,
    duration = 1,
    transformX,
    transformY,
} = defineProps<{
    fade?: boolean;
    duration?: number;
    transformY?: 'top' | 'bottom';
    transformX?: 'left' | 'right';
}>();

const elementRef = ref<HTMLElement>();

onMounted(() => {
    if (fade) {
        gsap.fromTo(
            elementRef.value!,
            { opacity: 0 },
            {
                opacity: 1,
                duration,
                ease: 'power4.inOut',
            },
        );
    }

    if (transformX) {
        gsap.fromTo(
            elementRef.value!,
            { x: transformX === 'left' ? -100 : 100 },
            {
                x: 0,
                duration,
                ease: 'power4.inOut',
            },
        );
    } else if (transformY) {
        gsap.fromTo(
            elementRef.value!,
            { y: transformY === 'top' ? -100 : 100 },
            {
                y: 0,
                duration,
                ease: 'power4.inOut',
            },
        );
    }
});
</script>
