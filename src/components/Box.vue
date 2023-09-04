<template>
    <div v-bind="attrs">
        <slot />
    </div>
</template>

<script setup lang="ts">
const attrs = useCloneDeep(useAttrs());

if (!attrs.class) {
    attrs.class = 'relative overflow-hidden';
} else {
    attrs.class += ' relative overflow-hidden';
}
</script>
