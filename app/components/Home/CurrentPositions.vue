<template>
    <div class="space-y-4">
        <h2 class="text-3xl font-bold max-md:text-center md:text-4xl">
            Current Positions 🚀
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
            <a
                v-for="(position, index) in currentPositions"
                :key="index"
                :href="position.link"
                target="_blank"
                class="cursor-pointer space-y-4 rounded-lg border border-indigo-900 bg-primary p-4 transition-all hover:scale-105 hover:bg-secondary active:scale-95"
            >
                <div class="flex items-center justify-between gap-2">
                    <h3 class="text-2xl font-semibold">{{ position.name }}</h3>
                    <img
                        :src="position.image"
                        width="40"
                        height="40"
                        :alt="position.name"
                    />
                </div>
                <span class="font-medium text-slate-300">
                    as {{ position.role }}
                </span>
                <p class="text-slate-400">
                    {{ position.description }}
                </p>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import currentPositions from '@/data/currentPositions.json';
</script>
