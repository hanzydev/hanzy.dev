<template>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator
        :throttle="0"
        :duration="3000"
        :color="colors.indigo[500]"
    />

    <Head>
        <Meta
            name="keywords"
            content="hànzy, hànzydev, hanzy, hanzydev, emirhan77, emirhan"
        />
        <Meta property="og:url" content="https://hanzy.dev" />
    </Head>

    <div class="flex h-full min-h-screen flex-col">
        <NuxtLayout>
            <div class="md:mt-16">
                <NuxtPage />
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import colors from 'tailwindcss/colors';

useHead({
    title: 'Hanzy',
    titleTemplate: (title) =>
        title && title !== 'Hanzy' ? `${title} | Hanzy` : 'Hanzy',
});
</script>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.15s cubic-bezier(0, 0, 0.58, 1);
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
    scale: 0.95;
    transform: translateY(10px);
}
</style>
