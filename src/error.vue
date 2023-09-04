<template>
    <NuxtLayout>
        <div class="relative top-0 m-auto w-full h-full">
            <Container>
                <div class="flex flex-col justify-center items-center text-center">
                    <h1
                        class="font-extrabold text-9xl md:text-[10rem] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500"
                    >
                        {{ error.statusCode }}
                    </h1>
                    <p class="mt-4 text-2xl md:text-3xl font-medium text-gray-500">
                        {{ statusMessage }}
                    </p>
                    <NuxtLink
                        to="/"
                        class="group mt-10 bg-[rgba(0,0,0,0.2)] backdrop-blur-md transition-all duration-300 py-3.5 px-5 rounded-2xl text-lg md:text-xl"
                    >
                        Go back to home
                        <Icon
                            icon="majesticons:chevron-right-line"
                            class="inline-block w-6 h-6 transition-[margin] duration-300 group-hover:ml-2"
                        />
                    </NuxtLink>
                </div>
            </Container>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
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
