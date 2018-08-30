import Vue from "vue"
import VueRouter from "vue-router"
import VueAxios from "vue-axios"
import {
	Swipe, SwipeItem,
    Navbar, TabItem
} from "mint-ui"
import "./styles/mint-ui.css"
import axios from "axios"
import routes from "./routes"

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
// Vue.axios.defaults.baseURL = 'https://api-demo.websanova.com/api/v1';
Vue.router = new VueRouter({ routes });

Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);

Vue.use(require('@websanova/vue-auth'), {
	auth:   require('@websanova/vue-auth/drivers/auth/basic.js'),
	http:   require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
	router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
	authRedirect:   { path: "/autumnFarmWX/admin/login" },
    loginData:		{ url: "/api/v1/admin/log/in" },
    registerData:	{ url: "/api/v1/admin/log/up" },
	fetchData:		{ url: "/api/v1/admin/log/stat" },
	refreshData:	{ url: "/api/v1/admin/log/refs" }
});

new Vue({
	template: `
        <div class="h-100" v-show="$auth.ready()">
            <router-view></router-view>
        </div>
    `,
	router: Vue.router
}).$mount("#app");

export default routes.map(route => route.path)