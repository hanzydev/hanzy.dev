<template>
    <div class="relative top-0 m-auto w-full h-full">
        <Container>
            <div class="flex flex-col justify-center items-center text-center">
                <Animation transformY="top">
                    <h1
                        class="font-extrabold text-9xl md:text-[10rem] text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500"
                    >
                        {{ statusCode }}
                    </h1>
                </Animation>
                <Animation transformX="left">
                    <p class="mt-4 text-2xl md:text-3xl font-medium text-gray-500">
                        {{ message }}
                    </p>
                </Animation>
                <Animation transformY="bottom">
                    <RippleEffect class="mt-10 rounded-2xl">
                        <NuxtLink
                            :to="button.to"
                            type="button"
                            role="button"
                            class="bg-[rgba(0,0,0,0.2)] text-gray-300 hover:text-white hover:bg-[rgba(0,0,0,0.3)] backdrop-blur-md transition-all duration-300 py-3.5 px-8 rounded-2xl text-lg md:text-xl"
                        >
                            {{ button.text }}
                        </NuxtLink>
                    </RippleEffect>
                </Animation>
            </div>
        </Container>
    </div>
</template>

<script setup lang="ts">
const {
    button = {
        text: 'Go back to home',
        to: '/',
    },
} = defineProps<{
    statusCode: number;
    message: string;
    button?: {
        text: string;
        to: string;
    };
}>();
</script>
