<template>
    <div class="pt-24" />
    <div class="relative top-0 m-auto w-full h-full">
        <Container>
            <div
                class="flex max-lg:flex-col max-lg:justify-center items-center max-lg:space-y-6 lg:space-x-12"
            >
                <ScrollAnimation transformX="left">
                    <a
                        target="_blank"
                        class="relative flex items-center justify-center w-[250px]"
                        id="avatar"
                        :href="`https://discord.com/users/${store.data!.discord_user.id}`"
                    >
                        <img
                            draggable="false"
                            class="w-full h-full rounded-full"
                            id="avatar-img"
                            width="250"
                            height="250"
                            ref="avatarRef"
                            :src="
                                resolveAvatarURL(
                                    store.data!.discord_user.id,
                                    store.data!.discord_user.avatar,
                                )
                            "
                            :alt="`${store.data!.discord_user.username}'s avatar`"
                            @load="showStatus = true"
                        />
                        <div
                            class="top-[11.5rem] left-[12.5rem] absolute p-2 rounded-full z-20"
                            v-if="showStatus"
                        >
                            <div
                                class="w-7 h-7 rounded-full"
                                :style="{
                                    backgroundColor: StatusColors[store.data!.discord_status],
                                }"
                            ></div>
                        </div>
                    </a>
                </ScrollAnimation>
                <div class="flex flex-col max-lg:items-center max-lg:text-center space-y-4 flex-1">
                    <ScrollAnimation transformY="top">
                        <div class="flex space-x-2">
                            <h1 class="font-bold text-3xl sm:text-4xl">
                                {{ store.data!.discord_user.username }}
                            </h1>
                            <p
                                class="font-robotomono mt-auto font-medium text-lg text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500"
                            >
                                <span class="font-bold text-2xl text-white">|</span>
                                full-stack dev.
                            </p>
                        </div>
                    </ScrollAnimation>

                    <ScrollAnimation transformY="bottom">
                        <p class="font-medium text-base sm:text-lg text-gray-300">
                            Hello! My name is <b>Emirhan</b>. I&apos;m a young developer living in
                            <b>Türkiye</b> and I got into the software industry about
                            <b>3.5</b> years ago. I&apos;m currently working on
                            <b>web development</b>. I&apos;m a full stack developer. If you want to
                            work with me feel free to contact me.
                        </p>
                    </ScrollAnimation>
                </div>
            </div>
        </Container>
    </div>
</template>

<script setup lang="ts">
import { useLanyardStore } from '@/store';
import { resolveAvatarURL } from '@/util/resolveAvatarURL';

const store = useLanyardStore();
const showStatus = ref(false);

const avatarRef = ref<HTMLImageElement>();

enum StatusColors {
    online = '#3ba55c',
    idle = '#faa61a',
    dnd = '#e44343',
    offline = '#747f8c',
}

onMounted(() => {
    showStatus.value = avatarRef.value!.complete;
});

useHead({
    title: 'Home',
    meta: [
        {
            property: 'og:title',
            content: 'Home | Hànzy',
        },
    ],
});
</script>

<style scoped>
#avatar-img {
    mask-image: radial-gradient(
        circle 25px at calc(100% - 27.5px) calc(100% - 43px),
        transparent 25px,
        #000 26px
    );
}
</style>
