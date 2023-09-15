<template>
    <Animation class="absolute w-full z-50" transformY="top">
        <Container>
            <Box
                class="bg-[rgba(0,0,0,0.2)] backdrop-blur-md p-4 w-full rounded-xl justify-between flex h-14"
                id="navbar"
            >
                <h2 class="cursor-default font-bold">hànzy</h2>

                <button
                    class="absolute right-3"
                    aria-label="Toggle navbar"
                    v-if="isMobile"
                    @click="toggleNavbar"
                >
                    <Icon
                        :icon="isOpen ? 'tabler:x' : 'tabler:menu-2'"
                        class="text-white w-6 h-6"
                    />
                </button>

                <div class="flex items-center justify-between gap-4" v-if="!isMobile">
                    <NuxtLink
                        v-for="(item, index) in items"
                        :to="item.to"
                        :key="index"
                        :class="`transition-colors duration-300 cursor-pointer flex items-center space-x-1 link font-medium ${
                            'className' in item ? item.className : ''
                        }`"
                    >
                        <Icon :icon="item.icon" class="text-white w-4 h-4" />
                        <span>{{ item.name }}</span>
                    </NuxtLink>
                </div>
                <div
                    class="flex-col justify-center w-full space-y-4 px-4 z-50 absolute top-16 left-0 hidden"
                    id="mobile-nav"
                    v-else
                >
                    <NuxtLink
                        v-for="(item, index) in items"
                        :to="item.to"
                        :key="index"
                        class="rounded-lg font-medium transition-colors hover:bg-[rgba(0,0,0,0.2)] py-3 px-4 w-full duration-300 cursor-pointer flex items-center space-x-2 link before:origin-left"
                    >
                        <Icon :icon="item.icon" class="text-white w-6 h-6" />
                        <span :class="'className' in item ? item.className : ''">{{
                            useUpperFirst(item.name)
                        }}</span>
                    </NuxtLink>
                </div>
            </Box>
        </Container>
    </Animation>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import { Icon } from '@iconify/vue';
import items from '@/data/navbar.json';

const router = useRouter();

const isOpen = ref(false);
const isMobile = ref(false);

const openNavbar = async () => {
    await gsap.to('#navbar', {
        duration: 0.3,
        height: `${items.length * 5}rem`,
    });

    gsap.to('#mobile-nav', {
        duration: 0.3,
        display: 'flex',
    });

    gsap.fromTo(
        '#mobile-nav > a',
        {
            opacity: 0,
            x: -20,
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.1,
        },
    );

    isOpen.value = true;
};

const closeNavbar = async () => {
    await gsap.to('#mobile-nav > a', {
        opacity: 0,
        x: -20,
        duration: 0.3,
        stagger: -0.1,
    });

    gsap.to('#mobile-nav', {
        duration: 0.3,
        display: 'none',
    });

    gsap.to('#navbar', {
        duration: 0.3,
        height: '56px',
    });

    isOpen.value = false;
};

const toggleNavbar = () => {
    if (isOpen.value) {
        closeNavbar();
    } else {
        openNavbar();
    }
};

const onResize = () => {
    isMobile.value = window.innerWidth <= 768;

    if (!isMobile.value && isOpen.value) {
        closeNavbar();
    }
};

router.beforeEach(async (_, __, next) => {
    if (isMobile.value && isOpen.value) {
        await closeNavbar();
    }

    next();
});

onMounted(() => {
    onResize();

    window.addEventListener('resize', onResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', onResize);
});
</script>

<style scoped>
.router-link-active::before {
    transform: scaleX(1);
}
</style>
