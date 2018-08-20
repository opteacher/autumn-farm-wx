import prodList from "./pages/prodList"
import prodDtl from "./pages/prodDtl"
import wxAuth from "./pages/wxAuth"
import orderList from "./pages/orderList"
import orderDtl from "./pages/orderDtl"
import newOrder from "./pages/newOrder"

export default [{
	path: "/prod/list/:type",
	component: prodList
}, {
	path: "/prod/detail/:id",
	component: prodDtl,
}, {
	path: "/wx/auth",
	component: wxAuth
}, {
	path: "/order/list",
	component: orderList
}, {
	path: "/order/detail/:oid",
	component: orderDtl
}, {
	path: "/order/new/:oid",
	component: newOrder
}];