import home from "./pages/home"
import login from "./pages/login"
import logup from "./pages/logup"

export default [{
	path: "/",
	component: home
}, {
	path: "/login",
	component: login,
	meta: {auth: false}
}, {
	path: "/logup",
	component: logup,
	meta: {auth: false}
}];