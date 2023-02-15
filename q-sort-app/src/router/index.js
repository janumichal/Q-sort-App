import { createRouter, createWebHistory } from "vue-router"
import Sorting from "../views/Sorting.vue"

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/Sorting',
  //   name: 'Sorting',
  //   component: Sorting
  // }
  {
      path: process.env.NODE_ENV === "production" ? "/Q-SortApp/" : "/",
      name: 'Sorting',
      component: Sorting
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
