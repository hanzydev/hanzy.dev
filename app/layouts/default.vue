<template>
    <div>
        <Transition
            enter-active-class="animate-in fade-in"
            leave-active-class="animate-out fade-out"
        >
            <div v-if="showCursor" pointer-events-none fixed z-9999>
                <div
                    ref="cursorCircle"
                    border="~ indigo-600"
                    absolute
                    size-9
                    select-none
                    rounded-full
                    bg-indigo-600
                    bg-opacity-20
                    transition-transform
                    :style="cursorCircleStyle"
                ></div>
                <div
                    ref="cursorDot"
                    absolute
                    left-0.25
                    top-0.25
                    size-2
                    rounded-full
                    bg-white
                    :style="cursorDotStyle"
                ></div>
            </div>
        </Transition>

        <Navbar />
        <div md:mt16>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

const router = useRouter();

const showCursor = ref(false);
const tinyCursor = ref(false);
const largeCursor = ref(false);

const cursorCircleRef = useTemplateRef('cursorCircle');
const cursorDotRef = useTemplateRef('cursorDot');

const cursorCirclePosition = reactive({
    x: 0,
    y: 0,
});

const cursorDotPosition = reactive({
    x: 0,
    y: 0,
});

const cursorCircleStyle = computed<CSSProperties>(() => ({
    transform: `translate(${cursorCirclePosition.x}px, ${cursorCirclePosition.y}px) scale(${
        tinyCursor.value === largeCursor.value ? 1 : largeCursor.value ? 1.3 : 0.8
    })`,
    transitionTimingFunction: 'cubic-bezier(0, 0, 0.58, 1)',
    transitionDuration: '0.125s',
}));

const cursorDotStyle = computed<CSSProperties>(() => ({
    transform: `translate(${cursorDotPosition.x}px, ${cursorDotPosition.y}px)`,
}));

router.afterEach((to, from) => {
    if (from.path !== to.path) new Audio('/switch-page.mp3').play();
});

onMounted(() => {
    window.addEventListener('mousemove', (e) => {
        showCursor.value = true;

        cursorCirclePosition.x = e.clientX - cursorCircleRef.value!.clientWidth / 2;
        cursorCirclePosition.y = e.clientY - cursorCircleRef.value!.clientWidth / 2;

        cursorDotPosition.x = e.clientX - cursorDotRef.value!.clientWidth / 2;
        cursorDotPosition.y = e.clientY - cursorDotRef.value!.clientHeight / 2;

        const isAnchor = (target: HTMLElement) => {
            if (target.tagName === 'A') return true;
            if (target.parentElement) return isAnchor(target.parentElement);

            return false;
        };

        largeCursor.value = isAnchor(e.target as HTMLElement);
    });

    window.addEventListener('mousedown', () => (tinyCursor.value = true));
    window.addEventListener('mouseup', () => (tinyCursor.value = false));

    document.addEventListener('mouseenter', () => (showCursor.value = true));
    document.addEventListener('mouseleave', () => (showCursor.value = false));
});
</script>
