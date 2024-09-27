<template>
    <div space-y-4>
        <h2 text-3xl font-bold lt-md:text-center md:text-4xl>Current Positions 🚀</h2>
        <div grid="~ md:cols-2 gap4">
            <a
                v-for="(position, index) in currentPositions"
                :key="index"
                :href="position.link"
                target="_blank"
                border="~ indigo-900"
                cursor-none="!"
                rounded-lg
                bg-primary
                p4
                transition-all
                active:scale-95
                hover="scale-105 bg-secondary"
                space-y-4
            >
                <div flex="~ items-center justify-between gap2">
                    <h3 text-2xl font-semibold>{{ position.name }}</h3>
                    <img :src="position.image" width="40" height="40" :alt="position.name" />
                </div>
                <span text-slate-300 font-medium>as {{ position.role }}</span>
                <p text-slate-400>
                    {{ position.description }}
                </p>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import currentPositions from '@/data/currentPositions.json';
</script>
