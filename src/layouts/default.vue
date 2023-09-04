<template>
    <audio src="/nix-egg.mp3" id="nix-audio" class="hidden" loop />
    <audio src="/alber-egg.mp3" id="alber-audio" class="hidden" loop />

    <ScrollAnimation>
        <img src="/gradient-top.png" class="fixed -z-[1]" id="gradient-top" draggable="false" />
    </ScrollAnimation>

    <ScrollAnimation>
        <img
            src="/gradient-bottom.png"
            class="fixed bottom-0 -z-[1]"
            id="gradient-bottom"
            draggable="false"
        />
    </ScrollAnimation>

    <div class="flex flex-col min-h-screen w-full">
        <slot />
        <Footer />
    </div>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import '@/styles/main.css';

let latestString = '';
let latestClearTimeout: NodeJS.Timeout;
let toggledEgg: { name: string; tweens: gsap.core.Tween[] } = { name: '', tweens: [] };

const onKeyUp = (event: KeyboardEvent) => {
    if (latestClearTimeout) {
        clearTimeout(latestClearTimeout);
    }

    latestClearTimeout = setTimeout(() => {
        latestString = '';
    }, 5000);

    latestString += event.key;

    // nix egg
    if (latestString === 'nix' && toggledEgg.name !== 'nix') {
        const gradientTop = document.getElementById('gradient-top') as HTMLImageElement;
        const gradientBottom = document.getElementById('gradient-bottom') as HTMLImageElement;
        const nixAudio = document.getElementById('nix-audio') as HTMLAudioElement;
        const hanzys = document.getElementsByClassName('hanzy') as HTMLCollectionOf<HTMLElement>;
        const nixs = document.getElementsByClassName('nix') as HTMLCollectionOf<HTMLElement>;

        for (const hanzy of hanzys) {
            hanzy.classList.add('hidden');
        }

        for (const nix of nixs) {
            nix.classList.remove('hidden');
        }

        if (nixAudio) {
            nixAudio.play();
        }

        if (gradientTop && gradientBottom) {
            const tweenTop = gsap.to(gradientTop, {
                rotate: 360,
                duration: 1,
                repeat: -1,
                ease: 'power2.inOut',
            });
            const tweenBottom = gsap.to(gradientBottom, {
                rotate: -360,
                duration: 1,
                repeat: -1,
                ease: 'power2.inOut',
            });

            toggledEgg.tweens = [tweenTop, tweenBottom];
        }

        latestString = '';
        toggledEgg.name = 'nix';
    } else if (latestString === 'nix' && toggledEgg.name === 'nix') {
        const gradientTop = document.getElementById('gradient-top') as HTMLImageElement;
        const gradientBottom = document.getElementById('gradient-bottom') as HTMLImageElement;
        const nixAudio = document.getElementById('nix-audio') as HTMLAudioElement;
        const hanzys = document.getElementsByClassName('hanzy') as HTMLCollectionOf<HTMLElement>;
        const nixs = document.getElementsByClassName('nix') as HTMLCollectionOf<HTMLElement>;

        for (const hanzy of hanzys) {
            hanzy.classList.remove('hidden');
        }

        for (const nix of nixs) {
            nix.classList.add('hidden');
        }

        if (nixAudio) {
            nixAudio.pause();
        }

        if (gradientTop && gradientBottom) {
            toggledEgg.tweens.forEach((tween) => tween.kill());
            gsap.to(gradientTop, { rotate: 0, duration: 1, ease: 'power2.inOut' });
            gsap.to(gradientBottom, { rotate: 0, duration: 1, ease: 'power2.inOut' });
        }

        latestString = '';
        toggledEgg = { name: '', tweens: [] };
    }

    // alber egg
    if (latestString === 'pedofili' && toggledEgg.name !== 'pedofili') {
        const alberAudio = document.getElementById('alber-audio') as HTMLAudioElement;

        if (alberAudio) {
            alberAudio.play();
        }

        latestString = '';
        toggledEgg.name = 'pedofili';
    } else if (latestString === 'pedofili' && toggledEgg.name === 'pedofili') {
        const alberAudio = document.getElementById('alber-audio') as HTMLAudioElement;

        if (alberAudio) {
            alberAudio.pause();
        }

        latestString = '';
        toggledEgg = { name: '', tweens: [] };
    }
};

onMounted(() => {
    window.addEventListener('keyup', onKeyUp);
});

onUnmounted(() => {
    window.removeEventListener('keyup', onKeyUp);
});
</script>
