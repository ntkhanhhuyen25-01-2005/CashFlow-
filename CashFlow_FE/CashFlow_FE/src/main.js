import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Default from './layout/wrapper/index_admin.vue'
import Client from './layout/wrapper/index_client.vue'
const app = createApp(App)

app.use(router)
app.component("default-layout", Default);
app.component("client-layout", Client);
// app.component("Admin-layout", Default);
app.mount("#app")