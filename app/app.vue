<template>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator
        :throttle="0"
        :duration="3000"
        :color="theme.colors.indigo[500]"
    />

    <Head>
        <Title>Hanzy</Title>
        <Meta property="og:title" content="Hanzy" />
        <Meta
            name="description"
            content="Hi, I'm Emirhan (Hànzy), a young full-stack developer from Türkiye with 4 years of experience in web development."
        />
        <Meta
            property="og:description"
            content="Hi, I'm Emirhan (Hànzy), a young full-stack developer from Türkiye with 4 years of experience in web development."
        />
        <Meta
            name="keywords"
            content="hànzy, hànzydev, hanzy, hanzydev, emirhan77, emirhan"
        />
        <Meta property="og:url" content="https://hanzy.dev" />
    </Head>

    <div flex="~ col justify-between" hfull min-hscreen cursor-none="!">
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import { theme } from '@unocss/preset-mini';

useHead({
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
