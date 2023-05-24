import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import store from "./store"
import ToastPlugin from 'vue-toast-notification';
import VueSweetalert2 from 'vue-sweetalert2'
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'sweetalert2/dist/sweetalert2.min.css'

loadFonts()

createApp(App).use(router)
  .use(vuetify)
  .use(VueSweetalert2)
  .use(ToastPlugin)
  .use(store)
  .mount('#app')
