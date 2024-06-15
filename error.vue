<template>
    <Head>
        <Title>{{ error.statusMessage }} | {{ error.statusCode }}</Title>
    </Head>

    <div
        class="flex min-h-screen flex-col items-center justify-center gap-4 text-center"
    >
        <h1 class="text-9xl font-extrabold text-indigo-500 md:text-[10rem]">
            {{ error.statusCode }}
        </h1>

        <p class="text-2xl font-medium text-gray-500 md:text-3xl">
            {{ error.statusMessage }}
        </p>

        <Button
            variant="accent"
            class="w-fit flex-row-reverse gap-2 px-6"
            icon="heroicons-solid:arrow-right"
            href="/"
        >
            Go back
        </Button>
    </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const { error } = defineProps<{
    error: NuxtError;
}>();
</script>
