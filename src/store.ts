import { defineStore } from 'pinia';
import type { LanyardData } from '@/types';

export const useLanyardStore = defineStore({
    id: 'lanyard',
    state: () => ({
        data: null as LanyardData | null,
    }),
    actions: {
        setData(data: LanyardData) {
            this.data = data;
        },
    },
});
