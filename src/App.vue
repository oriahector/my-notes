<template>
  <DeleteNote v-if="$store.state.deleting" />
  <div
    v-if="$store.state.user"
    class="container | min-h-1/2 p-3 my-3 mx-auto | bg-white rounded-xl shadow-xl | md:flex"
  >
    <!-- left side -->
    <section class="md:w-1/4 p-3 mr-3">
      <a
        @click="$store.dispatch('userLogout')"
        href="#"
        class="underline text-center block font-bold mb-4"
        >Log out</a
      >
      <SearchNote />
      <NoteList />
    </section>
    <!-- right side -->
    <section class="p-3 | flex-grow">
      <ActiveNote />
    </section>
  </div>
  <div v-else class="w-full h-screen | flex justify-center items-center">
    <a @click="$store.dispatch('userLogin')" href="#" class="underline"
      >Login please</a
    >
  </div>
</template>

<script>
import NoteList from "@/components/NoteList.vue";
import ActiveNote from "@/components/ActiveNote.vue";
import DeleteNote from "@/components/DeleteNote.vue";
import SearchNote from "@/components/SearchNote.vue";

export default {
  name: "App",
  components: {
    NoteList,
    ActiveNote,
    DeleteNote,
    SearchNote,
  },
};
</script>

<style>
.dev {
  border: 1px solid red;
}
</style>
