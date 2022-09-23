import Vue from "vue";
import App from "./App.vue";
// import createRouter from './router/index';
// import createStore from './vuex/store'
export default () => { // 为了保证实例的唯一性所以导出一个创建实例的函数
    // let router = createRouter();
    // let store = createStore();
    const app = new Vue({
        // router,
        // store,
        render: h => h(App)
    });
    return { app};
};