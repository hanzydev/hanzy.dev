<template>
    <Container>
        <div
            flex="~ items-center justify-between"
            wfull
            border="~ indigo-900"
            rounded-lg
            bg-primary
            p4
            lt-sm:flex-col
            sm:p2
        >
            <div flex="~ items-center justify-between" wfull>
                <h3 cursor-default font-semibold uppercase ml="3.5 sm:2">
                    hànzy
                </h3>
                <Button
                    mla
                    h10
                    w10
                    sm:hidden
                    !p0
                    alignment="center"
                    aria-label="Toggle navbar"
                    :icon="isOpen ? 'tabler:x' : 'tabler:menu-2'"
                    icon-size="24"
                    @click="isOpen = !isOpen"
                />
            </div>

            <div flex="~ items-center gap2" lt-sm:hidden>
                <Button
                    v-for="(item, index) in navbar"
                    :key="index"
                    :href="item.href"
                    :icon="item.icon"
                    :class="$route.path === item.href && 'bg-secondary'"
                    gap2
                >
                    <span>{{ item.name }}</span>
                </Button>
            </div>

            <Transition
                enter-from-class="h-0"
                leave-to-class="h-0"
                enter-active-class="animate-in fade-in transition-all overflow-hidden"
                leave-active-class="animate-out fade-out transition-all overflow-hidden"
                enter-to-class="h[--height]"
                leave-from-class="h[--height]"
                :style="{ '--height': `${mobileNavbarHeight}px` }"
            >
                <div
                    v-if="isOpen"
                    ref="mobileNavbarRef"
                    class="wfull overflow-hidden space-y-2 sm:!hidden"
                >
                    <Button
                        v-for="(item, index) in navbar"
                        :key="index"
                        :href="item.href"
                        :icon="item.icon"
                        :class="[
                            $route.path === item.href && 'bg-secondary',
                            index === 0 && 'mt4',
                        ]"
                        gap2
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
