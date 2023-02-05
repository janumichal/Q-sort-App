import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia"
import VueCookies from "vue-cookies"

const pinia = createPinia()
const app = createApp(App)

app.use(VueCookies, {
    expires: "1y"
})
app.use(pinia)
app.use(router)
app.mount("#app")
