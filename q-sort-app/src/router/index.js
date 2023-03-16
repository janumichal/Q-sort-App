import { createRouter, createWebHistory } from "vue-router"
import Sorting from "../views/Sorting.vue"
import Home from "../views/Home.vue"
import Ferwell from "../views/Ferwell.vue"

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/Sorting/:uid",
		name: "Sorting",
		component: Sorting
	},
	{
		path: "/Final",
		name: "Ferwell",
		component: Ferwell
	}

]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
