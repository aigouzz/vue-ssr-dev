import router from './router/index';
import store from './vuex/store';
import { createApp } from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';

export function createAPP() {
    sync(store, router);
    const app = createApp({
        router,
        store,
        render: h => h(App)
    });

    return {app, router, store};
};