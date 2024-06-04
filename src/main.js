import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from "./router";
/* import { waveform } from 'ldrs'; */
/* import "ldrs/waveform"; */

/* const app = createApp(App)
app.use(router)
app.component(waveform)
app.mount('#app') */

createApp(App).use(router).mount('#app')
