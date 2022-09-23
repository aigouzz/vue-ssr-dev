const Vue = require('vue');
const render = require('vue-server-renderer');
const Koa = require('koa');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const vm = new Vue({
    data(){
        return {msg:"hello world"}
    },
    template:`<div>{{msg}}</div>`
});
const template = require('fs').readFileSync('../public/index.html','utf8');
router.get('/',async (ctx)=>{
    let r = await render.createRenderer({
        template
    }).renderToString(vm);
    ctx.body = r;
});
app.use(router.routes());
app.listen(4000);