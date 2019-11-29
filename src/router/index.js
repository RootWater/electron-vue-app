import Vue from 'vue'
import Router from 'vue-router'
import ViewUI from 'view-design'
import routes from './router'

Vue.use(Router);

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    next();
});

router.afterEach((to, from) => {
    ViewUI.LoadingBar.finish();
});

export default router
