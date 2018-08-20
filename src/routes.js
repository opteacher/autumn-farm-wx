import prodList from "./pages/prodList"
import prodDtl from "./pages/prodDtl"
import wxAuth from "./pages/wxAuth"
import orderList from "./pages/orderList"
import orderDtl from "./pages/orderDtl"
import newOrder from "./pages/newOrder"
import wxAdmPcsOrders from "./pages/wxAdmPcsOrders"
import wxAdmCfgAdvBar from "./pages/wxAdmCfgAdvBar"
import wxAdmCfgProds from "./pages/wxAdmCfgProds"
import wxAdmCfgProdDtl from "./pages/wxAdmCfgProdDtl"
import wxAdminLgn from "./pages/wxAdminLgn"

export default [{
	path: "/autumnFarmWX/prod/list/:type",
	component: prodList
}, {
	path: "/autumnFarmWX/prod/detail/:id",
	component: prodDtl,
}, {
	path: "/autumnFarmWX/wx/auth",
	component: wxAuth
}, {
	path: "/autumnFarmWX/order/list",
	component: orderList
}, {
	path: "/autumnFarmWX/order/detail/:oid",
	component: orderDtl
}, {
	path: "/autumnFarmWX/order/new/:oid",
	component: newOrder
}, {
    path: "/autumnFarmWX/admin/login",
    component: wxAdminLgn,
    meta: {auth: false}
}, {
    path: "/autumnFarmWX/admin/process/orders",
    component: wxAdmPcsOrders,
	meta: {
    	auth: true,
		redirect: "/autumnFarmWX/admin/login"
    }
}, {
    path: "/autumnFarmWX/admin/config/advbar",
    component: wxAdmCfgAdvBar,
    meta: {
        auth: true,
        redirect: "/autumnFarmWX/admin/login"
    }
}, {
    path: "/autumnFarmWX/admin/config/prods",
    component: wxAdmCfgProds,
    meta: {
        auth: true,
        redirect: "/autumnFarmWX/admin/login"
    }
}, {
    path: "/autumnFarmWX/admin/config/prod/:pid/detail",
    component: wxAdmCfgProdDtl,
    meta: {
        auth: true,
        redirect: "/autumnFarmWX/admin/login"
    }
}];