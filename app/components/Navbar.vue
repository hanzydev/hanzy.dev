<template>
    <Container>
        <div
            class="flex w-full items-center justify-between rounded-lg border border-indigo-900 bg-primary p-4 max-sm:flex-col sm:p-2"
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

            <div class="mt-4 flex items-center gap-2 max-sm:hidden">
                <Button
                    v-for="(item, index) in navbar"
                    :key="index"
                    :href="item.href"
                    :icon="item.icon"
                    :class="[
                        'gap-2',
                        $route.path === item.href && 'bg-secondary',
                    ]"
                >
                    <span>{{ item.name }}</span>
                </Button>
            </div>

            <Transition
                enter-from-class="h-0"
                leave-to-class="h-0"
                enter-active-class="animate-in fade-in transition-all overflow-hidden"
                leave-active-class="animate-out fade-out transition-all overflow-hidden"
                enter-to-class="h-[var(--height)]"
                leave-from-class="h-[var(--height)]"
                :style="{ '--height': `${mobileNavbarHeight}px` }"
            >
                <div
                    v-if="isOpen"
                    ref="mobileNavbarRef"
                    class="w-full space-y-2 overflow-hidden sm:!hidden"
                >
                    <Button
                        v-for="(item, index) in navbar"
                        :key="index"
                        :href="item.href"
                        :icon="item.icon"
                        :class="[
                            'gap-2',
                            $route.path === item.href && 'bg-secondary',
                            index === 0 && 'mt-4',
                        ]"
                    >
                        <span>{{ item.name }}</span>
                    </Button>
                </div>
            </Transition>
        </div>
    </Container>
</template>

<script setup lang="ts">
import navbar from '@/data/navbar.json';

const router = useRouter();

const mobileNavbarRef = ref<HTMLElement>();
const mobileNavbarHeight = ref(0);

const isOpen = ref(false);

router.beforeEach(async (_, __, next) => {
    isOpen.value = false;
    next();
});

watch(isOpen, async (value) => {
    if (value) {
        await nextTick();
        mobileNavbarHeight.value = mobileNavbarRef.value!.scrollHeight;
    }
});
</script>
