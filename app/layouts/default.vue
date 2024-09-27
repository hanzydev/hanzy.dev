<template>
    <div>
        <Navbar />
        <div md:mt16>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
const router = useRouter();

router.afterEach((to, from) => {
    if (from.path !== to.path) new Audio('/switch-page.mp3').play();
});
</script>
