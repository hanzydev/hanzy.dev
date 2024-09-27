<template>
    <div>
        <Head>
            <Title>Repositories</Title>
            <Meta property="og:title" content="Repositories | Hanzy" />
        </Head>

        <Container space-y-4>
            <h2 text-3xl font-bold md:text-4xl>Repositories 📦</h2>

            <div grid="~ xl:cols-2 gap4" wfull>
                <a
                    v-for="(repo, index) in data"
                    :key="index"
                    flex="~ col justify-between"
                    border="~ indigo-900"
                    h40
                    wfull
                    cursor-none="!"
                    rounded-lg
                    bg-primary
                    p4
                    transition-all
                    active:scale-95
                    hover="scale-105 bg-secondary"
                    :aria-label="repo.name"
                    :href="repo.url"
                    target="_blank"
                >
                    <div space-y-3>
                        <p text-lg font-semibold>
                            {{ repo.name }}
                        </p>
                        <p line-clamp-2 text-sm text-gray-300>
                            {{ repo.description || 'No description provided.' }}
                        </p>
                    </div>
                    <div flex="~ items-center justify-between gap2">
                        <div flex="~ items-center gap2">
                            <button
                                flex="~ items-center gap2"
                                rounded-md
                                bg-white="/5"
                                p="y1 x2"
                                text-sm
                                text-gray-300
                            >
                                <GhIconsStar />
                                {{ repo.stars }}
                            </button>
                            <button
                                flex="~ items-center gap2"
                                rounded-md
                                bg-white="/5"
                                p="y1 x2"
                                text-sm
                                text-gray-300
                            >
                                <GhIconsFork />
                                {{ repo.forks }}
                            </button>
                            <button
                                flex="~ items-center gap2"
                                rounded-md
                                bg-white="/5"
                                p="y1 x2"
                                text-sm
                                text-gray-300
                                lt-sm:hidden
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
                            flex="~ items-center gap2"
                            rounded-md
                            bg-white="/5"
                            p="y1 x2"
                            text-sm
                            text-gray-300
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
