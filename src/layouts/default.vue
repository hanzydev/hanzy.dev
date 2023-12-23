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

    <div class="flex flex-col min-h-screen w-full">
        <slot />
        <Animation>
            <Footer />
        </Animation>
    </div>
</template>

<script setup lang="ts">
import '@/styles/main.css';

useHead({
    htmlAttrs: {
        class: 'scroll-smooth',
    },
    bodyAttrs: {
        class: 'text-white bg-black overflow-x-hidden font-inter',
    },
});
</script>
