import home from "./pages/home"
import my from "./pages/my"
import login from "./pages/login"
import logup from "./pages/logup"

export default [{
	path: "/",
	component: home
}, {
	path: "/my",
	component: my,
}, {
	path: "/login",
	component: login,
	meta: {auth: false}
}, {
	path: "/logup",
	component: logup,
	meta: {auth: false}
}];