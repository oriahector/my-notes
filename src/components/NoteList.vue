<template>
  <NoteListItem
    v-for="note in notes"
    :key="note.id"
    :note="note"
    class="py-3 px-4 my-4 | border rounded-full bg-green-100 | cursor-pointer"
  />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import NoteListItem from "@/components/NoteListItem.vue";
export default {
  name: "NoteList",
  setup() {
    const store = useStore();
    //const notes = computed(() => store.state.notes);
    return {
      notes: computed(() => store.getters.getNotesBySearchTerm),
    };
  },
  components: {
    NoteListItem,
  },
};
</script>
