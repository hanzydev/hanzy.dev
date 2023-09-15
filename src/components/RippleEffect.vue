<template>
    <Box @click="onClick">
        <slot />
    </Box>
</template>

<script setup lang="ts">
const onClick = (event: MouseEvent) => {
    const target = event.currentTarget as HTMLElement;

    const circle = document.createElement('div');
    const diameter = Math.max(target.clientWidth, target.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - target.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - target.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = target.getElementsByClassName('ripple')[0];

    if (ripple) {
        ripple.remove();
    }

    target.appendChild(circle);
};
</script>

<style>
.ripple {
    transform: scale(0);
    animation: ripple 450ms linear;
    @apply absolute rounded-full bg-[rgba(255,255,255,0.15)];
}

@keyframes ripple {
    to {
        transform: scale(4);
        @apply opacity-0;
    }
}
</style>
