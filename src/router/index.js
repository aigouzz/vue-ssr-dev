import Vue from 'vue';
import Router from 'vue-router';
import Bar from '../components/Bar.vue';

Vue.use(Router);

function createRouter() {
  const routes = [
    {
      path: '/bar',
      component: Bar
    },
    {
      path: '/foo',
      component: () => import('../components/Foo.vue')   // 异步路由
    },
    {
      path: '/about',
      component: () => import('../components/About.vue')   // 异步路由
    },
    {
      path: '*',
      component: Bar
    }
  ];

  const router = new Router({
    mode: 'history',
    routes
  });

  return router;
}

export default createRouter;