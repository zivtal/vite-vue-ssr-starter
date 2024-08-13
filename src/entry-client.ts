import './style.css'
import { createApp } from './main'
import router from "./routes"

const { app } = createApp()

app.use(router).mount('#app')
