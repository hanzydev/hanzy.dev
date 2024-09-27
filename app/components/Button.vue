<template>
    <component
        :is="resolved"
        flex="~ items-center"
        rounded-md
        p="y2 x3"
        transition-all
        active:scale-95
        :class="[
            {
                'bg-indigo-600 text-white': variant === 'accent',
                'bg-primary hover:bg-secondary': variant === 'primary',
                'bg-secondary hover:bg-primary': variant === 'secondary',
                'align-left justify-start text-left': alignment === 'left',
                'align-center justify-center text-center': alignment === 'center',
                'align-right justify-end text-right': alignment === 'right',
            },
        ]"
        :target="href ? (href?.startsWith('http') ? '_blank' : '_self') : undefined"
        :href
        type="button"
    >
        <Icon v-if="icon" :name="icon" :size="iconSize" flex-shrink-0 />
        <slot />
    </component>
</template>

<script setup lang="ts">
const {
    variant = 'primary',
    alignment = 'left',
    iconSize = '16',
    href,
} = defineProps<{
    variant?: 'accent' | 'primary' | 'secondary';
    alignment?: 'left' | 'center' | 'right';
    icon?: string;
    iconSize?: string;
    href?: string;
}>();

const resolved = computed(() => {
    if (href) return resolveComponent('NuxtLink');
    return 'button';
});
</script>
