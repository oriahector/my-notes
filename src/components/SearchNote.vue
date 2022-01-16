<template>
  <input
    v-model="searchTerm"
    type="search"
    placeholder="Search note"
    class="w-full py-2 px-3 | border rounded-full"
  />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "SearchNote",
  setup() {
    const store = useStore();
    const searchTerm = computed({
      get: () => store.state.searchTerm,
      set: (value) => store.commit("setSearchTerm", value),
    });
    return { searchTerm };
  },
};
</script>
