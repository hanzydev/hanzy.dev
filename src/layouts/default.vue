<template>
    <ScrollAnimation>
        <img src="/gradient-top.png" class="fixed -z-[1]" draggable="false" />
    </ScrollAnimation>

    <ScrollAnimation>
        <img src="/gradient-bottom.png" class="fixed bottom-0 -z-[1]" draggable="false" />
    </ScrollAnimation>

    <div class="flex flex-col min-h-screen w-full">
        <slot />
        <Footer />
    </div>
</template>

<script setup lang="ts">
import '@/styles/main.css';
</script>
