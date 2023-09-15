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

    <video
        src="https://cdn.discordapp.com/attachments/1118633571360444496/1151584805314625637/selimbey.mp4"
        class="absolute z-[9999] top-0 left-0 w-full h-full"
        ref="selimBeyVideoRef"
        v-if="selimBey"
    />

    <div class="flex flex-col min-h-screen w-full" v-else>
        <slot />
        <Animation>
            <Footer />
        </Animation>
    </div>
</template>

<script setup lang="ts">
import '@/styles/main.css';

const selimBey = ref(false);
const konamiCode = ref(0);

const selimBeyVideoRef = ref<HTMLVideoElement>();

const konami = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a',
];

const checkKonami = (e: KeyboardEvent) => {
    if (e.key === konami[konamiCode.value]) {
        konamiCode.value++;
    } else {
        konamiCode.value = 0;
    }

    if (konamiCode.value === konami.length) {
        selimBey.value = true;
    }
};

onMounted(() => {
    window.addEventListener('keydown', checkKonami);
});

onUnmounted(() => {
    window.removeEventListener('keydown', checkKonami);
});

watch(selimBey, (value) => {
    if (value) {
        nextTick(() => {
            selimBeyVideoRef.value!.play();
            selimBeyVideoRef.value!.onended = () => {
                selimBey.value = false;
                konamiCode.value = 0;
            };
        });
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
