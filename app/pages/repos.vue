<template>
    <div>
        <Head>
            <Title>Repositories</Title>
            <Meta property="og:title" content="Repositories | Hanzy" />
        </Head>

        <Container class="space-y-4">
            <h2 class="text-3xl font-bold md:text-4xl">Repositories 📦</h2>

            <div class="grid w-full gap-4 xl:grid-cols-2">
                <a
                    v-for="(repo, index) in data"
                    :key="index"
                    class="flex h-40 w-full cursor-pointer flex-col justify-between rounded-lg border border-indigo-900 bg-primary p-4 transition-all hover:scale-105 hover:bg-secondary active:scale-95"
                    :aria-label="repo.name"
                    :href="repo.url"
                    target="_blank"
                >
                    <div class="space-y-3">
                        <p class="text-lg font-semibold">
                            {{ repo.name }}
                        </p>
                        <p class="line-clamp-2 text-sm text-gray-300">
                            {{ repo.description || 'No description provided.' }}
                        </p>
                    </div>
                    <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-2">
                            <button
                                class="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1 text-sm text-gray-300"
                            >
                                <GhIconsStar />
                                {{ repo.stars }}
                            </button>
                            <button
                                class="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1 text-sm text-gray-300"
                            >
                                <GhIconsFork />
                                {{ repo.forks }}
                            </button>
                            <button
                                class="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1 text-sm text-gray-300 max-[440px]:hidden"
                            >
                                <GhIconsLicense />
                                {{
                                    repo.license
                                        ? repo.license.name
                                        : 'No license'
                                }}
                            </button>
                        </div>
                        <button
                            class="flex items-center gap-2 rounded-md bg-white/5 px-2 py-1 text-sm text-gray-300"
                        >
                            <GhIconsLanguage />
                            {{ repo.language }}
                        </button>
                    </div>
                </a>
            </div>
        </Container>
    </div>
</template>

<script setup lang="ts">
const { data } = await useFetch('/api/repositories');
</script>
