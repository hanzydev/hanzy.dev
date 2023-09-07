<template>
    <NuxtLoadingIndicator
        :throttle="0"
        :duration="3000"
        color="repeating-linear-gradient(to right, #3b82f6 0%, #ec4899 50%, #a855f7 100%)"
    />

    <NuxtLayout>
        <Navbar />
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useLanyardStore } from '@/store';
import { LanyardData } from '@/types';

const store = useLanyardStore();

if (!store.data) {
    const { data } = await useFetch<{ data: LanyardData }>(
        `https://api.lanyard.rest/v1/users/${import.meta.env.VITE_DISCORD_USER_ID}`,
    );

    store.setData(data.value!.data);
}

onMounted(() => {
    const connectToWS = () => {
        const socket = new WebSocket('wss://api.lanyard.rest/socket');
        let dataReceived = false;

        socket.onopen = () => {
            console.log('[WS] Connected');

            socket.send(
                JSON.stringify({
                    op: 2,
                    d: {
                        subscribe_to_id: import.meta.env.VITE_DISCORD_USER_ID,
                    },
                }),
            );
        };

        socket.onmessage = async (event) => {
            const { op, d } = JSON.parse(event.data);

            switch (op) {
                case 0:
                    console.log('[WS] Data received');
                    store.setData(d);
                    dataReceived = true;
                    break;
                case 1:
                    setInterval(() => {
                        if (dataReceived) {
                            console.log('[WS] Heartbeat sent');

                            socket.send(
                                JSON.stringify({
                                    op: 3,
                                }),
                            );
                        }
                    }, d.heartbeat_interval);

                    break;
            }
        };

        socket.onclose = () => {
            console.log('[WS] Closed');

            setTimeout(() => {
                console.log('[WS] Reconnecting in 5s');

                socket.onopen = null;
                socket.onclose = null;
                socket.onmessage = null;
                dataReceived = false;

                connectToWS();
            }, 5000);
        };
    };

    connectToWS();
});

useHead({
    titleTemplate: (title) =>
        title
            ? title === 'Hànzy' || title.split(' ').length
                ? title
                : `${title} - Hànzy`
            : 'Hànzy',
    meta: [
        {
            name: 'keywords',
            content: 'hànzy, hànzydev, hanzy, hanzydev, emirhan77, emirhan',
        },

        {
            property: 'og:url',
            content: 'https://hanzy.dev',
        },
    ],
});
</script>
