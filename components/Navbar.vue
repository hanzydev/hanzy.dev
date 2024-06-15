<template>
    <Container>
        <div
            class="flex w-full items-center justify-between rounded-lg border border-indigo-900 bg-primary p-4 max-sm:flex-col max-sm:space-y-4 sm:p-2"
        >
            <div class="flex w-full items-center justify-between">
                <h3
                    class="ml-3.5 cursor-default font-semibold uppercase sm:ml-2"
                >
                    hànzy
                </h3>
                <Button
                    class="ml-auto h-10 w-10 !p-0 sm:hidden"
                    alignment="center"
                    aria-label="Toggle navbar"
                    :icon="isOpen ? 'tabler:x' : 'tabler:menu-2'"
                    icon-size="24"
                    @click="isOpen = !isOpen"
                />
            </div>

            <div class="flex items-center gap-2 max-sm:hidden">
                <Button
                    v-for="(item, index) in navbar"
                    :href="item.href"
                    :icon="item.icon"
                    :key="index"
                    :class="[
                        'gap-2',
                        $route.path === item.href && 'bg-secondary',
                    ]"
                >
                    <span>{{ upperFirst(item.name) }}</span>
                </Button>
            </div>

            <div
                class="hidden w-full gap-2 space-y-2 overflow-hidden sm:!hidden"
                ref="mobileNavbarRef"
            >
                <Button
                    v-for="(item, index) in navbar"
                    :href="item.href"
                    :icon="item.icon"
                    :key="index"
                    :class="[
                        'gap-2',
                        $route.path === item.href && 'bg-secondary',
                    ]"
                >
                    <span>{{ upperFirst(item.name) }}</span>
                </Button>
            </div>
        </div>
    </Container>
</template>

<script setup lang="ts">
import { gsap, Cubic } from 'gsap';
import { upperFirst } from 'lodash-es';

import navbar from '@/utils/data/navbar.json';

const router = useRouter();

const mobileNavbarRef = ref<HTMLElement>();
const isOpen = ref(false);

const tl = computed(() =>
    gsap
        .timeline({ paused: true, reversed: true })
        .set(mobileNavbarRef.value!, {
            opacity: 1,
            height: 'auto',
            display: 'block',
        })
        .from(
            mobileNavbarRef.value!,
            {
                opacity: 0,
                height: 0,
                duration: 0.15,
                ease: Cubic.easeOut,
            },
            '+=0.001',
        ),
);

router.beforeEach(async (_, __, next) => {
    isOpen.value = false;
    next();
});

watch(isOpen, (value) => {
    tl.value[value ? 'play' : 'reverse']();
});
</script>
