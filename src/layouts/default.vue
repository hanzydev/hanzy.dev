<template>
    <ScrollAnimation>
        <img
            src="/gradient-top.png"
            alt="gradient top"
            class="fixed min-h-screen w-full -z-[1]"
            draggable="false"
        />
    </ScrollAnimation>

    <ScrollAnimation>
        <img
            src="/gradient-bottom.png"
            alt="gradient bottom"
            class="fixed min-h-screen w-full -z-[1]"
            draggable="false"
        />
    </ScrollAnimation>

    <div class="flex flex-col min-h-screen w-full">
        <slot />
        <Footer />
    </div>
</template>

<script setup lang="ts">
import '@/styles/main.css';
</script>
