<template>
    <NuxtLayout>
        <Error :statusCode="error.statusCode" :message="statusMessage" />
    </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from 'nuxt/app';

enum StatusMessages {
    'Not Found' = "The page you're looking for was not found.",
    'Internal Server Error' = 'An unexpected error occurred.',
}

enum StatusMessagesShort {
    'Not Found' = 404,
    'Internal Server Error' = 500,
}

const { error } = defineProps<{
    error: NuxtError;
}>();

if (process.env.NODE_ENV === 'development' && error.statusCode === 500) {
    console.log(error);
}

const shortStatusMessage = StatusMessagesShort[error.statusCode];
const statusMessage = StatusMessages[shortStatusMessage as keyof typeof StatusMessages];

useHead({
    title: `${error.statusCode} - ${shortStatusMessage}`,
    meta: [
        {
            property: 'og:title',
            content: `${error.statusCode} - ${shortStatusMessage}`,
        },
        {
            name: 'description',
            content: statusMessage,
        },
        {
            property: 'og:description',
            content: statusMessage,
        },
    ],
});
</script>
