import { createStore } from "vuex";
import {
  signOut,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  db,
  doc,
  onSnapshot,
  setDoc,
  //addDoc,
  updateDoc,
  collection,
  deleteDoc,
  // getDocs,
} from "../firebase";

export default createStore({
  state: {
    notes: [],
    activeNote: null,
    deleting: false,
    searchTerm: "",
    user: null,
  },
  getters: {
    getNoteById: (state) => (noteId) =>
      state.notes.find((note) => note.id === noteId),
    getNoteTitle: (state) => (noteId) => {
      const id = noteId ? noteId : state.activeNote;
      const body = state.notes.find((note) => note.id === id).body;
      return body.substring(0, 20);
    },
    getNotesBySearchTerm: (state) => {
      let filter = new RegExp(state.searchTerm, "i");
      return state.notes.filter((note) => note.body.match(filter));
    },
  },
  mutations: {
    setNotes(state, notes) {
      state.notes = notes;
    },
    setActiveNote(state, noteId = null) {
      state.activeNote = noteId;
    },
    setDeleting(state, deleting) {
      state.deleting = deleting;
    },
    setSearchTerm(state, searchTerm) {
      state.searchTerm = searchTerm;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async createNote({ commit, state }) {
      const docRef = doc(collection(db, "users", state.user.uid, "notes"));
      const id = docRef.id;
      const note = {
        body: "",
        id,
        createdAt: Date.now(),
        uid: state.user.uid,
      };
      try {
        await setDoc(docRef, note);
        commit("setActiveNote", note.id);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async updateNote({ state }, { id, body }) {
      console.log(body);
      try {
        await updateDoc(doc(db, "users", state.user.uid, "notes", id), {
          body,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async deleteNote({ state, commit }) {
      try {
        const docRef = doc(
          db,
          "users",
          state.user.uid,
          "notes",
          state.activeNote
        );
        await deleteDoc(docRef);

        commit("setDeleting", false);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async getNotes({ state, commit }) {
      const docRef = collection(db, "users", state.user.uid, "notes");

      onSnapshot(docRef, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let { body, uid, createdAt } = doc.data();
          notes.push({
            body,
            uid,
            id: doc.id,
            createdAt,
          });
        });
        commit("setNotes", notes);
        console.log("Current cities in CA: ", notes.join(", "));
      });

      // let notes = [];
      // docSnap.forEach((doc) => {
      //   let { body, uid, createdAt } = doc.data();
      //   notes.push({
      //     body,
      //     uid,
      //     id: doc.id,
      //     createdAt,
      //   });
      // });
      // commit("setNotes", notes);
    },

    async userLogin() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    async userLogout() {
      const auth = getAuth();
      try {
        await signOut(auth);
      } catch (error) {
        throw new Error(error.message);
      }
    },

    checkAuth({ commit, dispatch }) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        commit("setUser", user);
        if (user) {
          dispatch("getNotes");
        }
      });
    },
  },
  modules: {},
});
