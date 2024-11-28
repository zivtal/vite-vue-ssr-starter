import { defineStore } from 'pinia';
import { StoreNamespace } from './store-namespace.ts';
import { ref } from 'vue';

export const useGlobalStore = defineStore(StoreNamespace.GLOBAL, () => {
  const state = ref();

  return {
    state,
  };
});
