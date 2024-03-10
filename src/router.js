import { createRouter, createWebHistory } from "vue-router";
import NoteBoardView from "./views/NoteboardView.vue";
import ListNote from "./views/ListNote.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: NoteBoardView, name: "New Note" },
    { path: "/notebooks/list", component: ListNote, name: "List Notebooks" },
    {
      path: "/notebooks/:id",
      component: NoteBoardView,
      props: true,
      name: "Edit Note",
    },
  ],
});
