<template>
  <transition name="fade" mode="out-in">
    <div v-if="activeNote" class="h-full | flex flex-col">
      <div class="flex-1 | md:flex">
        <section class="flex-1">
          <ActiveNoteMD
            v-model:body="activeNote.body"
            @blur-note="blurNote"
            @update:body="updateNote"
            class="min-h-1/4 w-full h-full p-4 | rounded-l-lg bg-gray-100"
          />
        </section>
        <ActiveNoteHTML
          :body="activeNote.body"
          class="min-h-1/4 p-4 | bg-gray-200 rounded-r-lg | flex-1"
        />
      </div>
      <section
        class="mt-3 | flex flex-col md:flex-row justify-between items-center"
      >
        <div class="text-sm mb-4 md:mb-0">
          Created on {{ noteDate }}, contains {{ noteLength }} words
        </div>
        <div>
          <a
            href="#"
            @click="deleteNote"
            class="px-5 py-2 mr-2 | text-red-700 rounded-full"
            >Delete</a
          >
          <a
            href="#"
            @click="closeNote"
            class="px-5 py-2 | bg-gray-200 rounded-full"
            >Close</a
          >
        </div>
      </section>
    </div>
    <div v-else class="h-full | flex justify-center items-center">
      Please select a note to start editing or
      <a href="#" @click="createNote" class="underline font-bold"
        >create a new one 🚒</a
      >
    </div>
  </transition>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import ActiveNoteHTML from "@/components/ActiveNoteHTML.vue";
import ActiveNoteMD from "@/components/ActiveNoteMD.vue";

export default {
  name: "ActiveNote",
  setup() {
    const store = useStore();
    const activeNote = computed(() =>
      store.state.activeNote
        ? store.getters.getNoteById(store.state.activeNote)
        : null
    );
    const updateNote = (value) =>
      store.dispatch("updateNote", {
        id: activeNote.value.id,
        body: value,
      });
    const closeNote = () => store.commit("setActiveNote");
    const createNote = () => store.dispatch("createNote");
    const deleteNote = () => store.commit("setDeleting", true);
    const blurNote = (value) => !value.length && store.dispatch("deleteNote");

    return {
      activeNote,
      updateNote,
      closeNote,
      createNote,
      deleteNote,
      blurNote,
      noteDate: computed(
        () =>
          activeNote.value &&
          new Date(activeNote.value.createdAt).toLocaleString()
      ),
      noteLength: computed(
        () => activeNote.value && activeNote.value.body.split(/\W+/).length
      ),
    };
  },
  components: {
    ActiveNoteHTML,
    ActiveNoteMD,
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
