import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Ensure router is imported
import store from './store';   // Ensure Vuex store is imported

createApp(App)
    .use(router) // Add router to the app
    .use(store)  // Add store to the app
    .mount('#app');
