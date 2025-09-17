import { createRouter, createWebHistory } from "vue-router"; // cài vue-router: npm install vue-router@next --save

const routes = [
    {
        path : '/',
        component: ()=>import('../components/Client/TrangChu/index.vue'),
        meta: { layout: "blank" },
    },
    {
        path : '/admin/LoginAdmin',
        component: ()=>import('../components/Admin/Login/LoginAdmin.vue'),
        meta: { layout: "blank" },
    },
    {
        path : '/admin/Dashboard',
        component: ()=>import('../components/Admin/Dashboard/index.vue'),
        meta : {'layout' : 'default' }
    },
    {
        path : '/admin/tongquan',
        component: ()=>import('../components/Admin/TongQuan/index.vue'),
        meta : {'layout' : 'default' }
    },
    {
        path : '/admin/lichsugiaodich',
        component: ()=>import('../components/Admin/LichSuGiaoDich/index.vue'),
        meta : {'layout' : 'default' }
    },
    {
        path : '/admin/baocao',
        component: ()=>import('../components/Admin/BaoCao/index.vue'),
        meta : {'layout' : 'default' }
    },
    {
        path : '/admin/quanlikhachhang',
        component: ()=>import('../components/Admin/QuanLiKhachHang/index.vue'),
        meta : {'layout' : 'default' }
    },

//  ================Client===================
  {
    path: "/client-login",
    component: () => import("../components/Client/Login/index.vue"),
    meta: { layout: "blank" },
  },

  // ...existing code...
  {
    path: "/client/trangchu",
    component: () => import("../components/Client/DashBoard/index.vue"),
    meta: { layout: "client", requiresClient: true },
  },
// ...existing code...

  {
    path: "/client/profile",
    component: () => import("../components/Client/Profile/index.vue"),
    meta: { layout: "client", requiresClient: true },
  },
  {
    path: "/client/giaodich",
    component: () => import("../components/Client/GiaoDich/index.vue"),
    meta: { layout: "client", requiresClient: true },
  },
  {
    path: "/client/ngansach",
    component: () => import("../components/Client/NganSach/index.vue"),
    meta: { layout: "client", requiresClient: true },
  },
  {
    path: "/client/baocao",
    component: () => import("../components/Client/BaoCaoPhanTich/index.vue"),
    meta: { layout: "client", requiresClient: true },
  },
  {
    path: "/client/quanli-giadinh",
    component: () => import("../components/Client/QuanLiGiaDinh/index.vue"),
    meta: { layout: "client", requiresClient: true },
  },
  {
    path: "/client/thanhtoan",
    component: () => import("../components/Client/ThanhToan/index.vue"),
    meta: { layout: "client", requiresClient: true },
  },
  {
    path: "/client/feedback",
    component: () => import("../components/Client/FeedBack/index.vue"),
    meta: { layout: "client", requiresClient: true },
  },
  {
    path: "/client/DangKy",
    component: () => import("../components/Client/Register/index.vue"),
    meta: { layout: "blank" },
  },
  {
    path: "/admin",
    redirect: "/admin/Dashboard",
  },
  {
    path: "/client",
    redirect: "/client/trangchu",
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("../components/Client/TrangChu/index.vue"), // hoặc tạo trang 404 riêng
    meta: { layout: "blank" },
  },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router