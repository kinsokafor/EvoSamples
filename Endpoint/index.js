import {createApp} from 'vue'
import app from '@/components/AppMount.vue'
import router from './router'
import { createPinia } from 'pinia'
import restricted from '@/plugins/restricted'

createApp(app)
        .use(createPinia())
        .use(restricted)
        .use(router)
        .mount("#app")