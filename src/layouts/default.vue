<template>
    <audio src="/disco.mp3" id="disco-audio" class="hidden" loop />

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
        const license = document.getElementById('license-link') as HTMLLinkElement;
        const nixLicense = document.getElementById('nix-license-link') as HTMLLinkElement;
        const discoAudio = document.getElementById('disco-audio') as HTMLAudioElement;
        const author = document.getElementById('author') as HTMLSpanElement;
        const authorNix = document.getElementById('author-nix') as HTMLSpanElement;

        if (discoAudio) {
            discoAudio.play();
        }

        if (license && nixLicense) {
            license.classList.add('hidden');
            nixLicense.classList.remove('hidden');
        }

        if (author && authorNix) {
            author.classList.add('hidden');
            authorNix.classList.remove('hidden');
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
        const license = document.getElementById('license-link') as HTMLLinkElement;
        const nixLicense = document.getElementById('nix-license-link') as HTMLLinkElement;
        const discoAudio = document.getElementById('disco-audio') as HTMLAudioElement;
        const author = document.getElementById('author') as HTMLSpanElement;
        const authorNix = document.getElementById('author-nix') as HTMLSpanElement;

        if (discoAudio) {
            discoAudio.pause();
        }

        if (license && nixLicense) {
            license.classList.remove('hidden');
            nixLicense.classList.add('hidden');
        }

        if (author && authorNix) {
            author.classList.remove('hidden');
            authorNix.classList.add('hidden');
        }

        if (gradientTop && gradientBottom) {
            toggledEgg.tweens.forEach((tween) => tween.kill());
            gsap.to(gradientTop, { rotate: 0, duration: 1, ease: 'power2.inOut' });
            gsap.to(gradientBottom, { rotate: 0, duration: 1, ease: 'power2.inOut' });
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
