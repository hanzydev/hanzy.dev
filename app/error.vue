<template>
    <Head>
        <Title>{{ error.statusMessage }} | {{ error.statusCode }}</Title>
    </Head>

    <div flex="~ col items-center justify-center gap4" min-hscreen text-center>
        <h1 text-9xl text-indigo-500 font-extrabold md:text-10rem>
            {{ error.statusCode }}
        </h1>

        <p text-2xl text-gray-500 font-medium md:text-3xl>
            {{ error.statusMessage }}
        </p>

        <Button
            variant="accent"
            wfit
            flex-row-reverse
            gap2
            px6
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
