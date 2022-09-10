import { createAPP } from './app';
import { mixin } from 'vue';

mixin({
  beforeRouteUpdate(to, from, next) {
    const {
      asyncData
    } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const {
  app,
  router,
  store
} = createAPP();

// 将服务端渲染时候的状态写入vuex中
// 使用window.__INITIAL_STATE__中的数据替换整个state中的数据，这样服务端渲染结束后，客户端也可以自由操作state中的数据
// 这句的作用是如果服务端的vuex数据发生改变，就将客户端的数据替换掉，保证客户端和服务端的数据同步
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 客户端数据预取 (Client Data Fetching)
// 在路由导航之前解析数据
router.onReady(() => {
  // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)

    // 我们只关心非预渲染的组件
    // 所以我们对比它们的dom结构是否一致
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })

    if (!activated.length) {
      return next()
    }

    // 这里如果有加载指示器 (loading indicator)，就触发

    // 遇到没被服务端渲染的组件，再去发异步请求拿数据
    // 客户端构建的虚拟 DOM 树vDOM与服务器渲染返回的HTML结构不一致，这时候，客户端会请求一次服务器再渲染整个应用程序
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({ 
          store, 
          route: to 
        })
      }
    })).then(() => {
      // 停止加载指示器(loading indicator)
      next()
    }).catch(next)
  })

  // 用下面这行挂载(mount)应用程序：客户端激活
  // 所谓客户端激活，指的是 Vue 在浏览器端接管由服务端发送的静态 HTML，使其变为由 Vue 管理的动态 DOM 的过程。
  app.mount('#app')
})
