import DashboardView from "./modules/views/Dashboard/DashboardView";
import TableList from "./modules/views/TableList";
import AnuncioController from "modules/views/Anuncio/AnuncioController";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: DashboardView,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Anúncio",
    icon: "pe-7s-user",
    component: AnuncioController,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Controle de estoque",
    icon: "pe-7s-note2",
    component: TableList,
    layout: "/admin"
  }/*,
  {
    path: "/typography",
    name: "Typography",
    icon: "pe-7s-news-paper",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "pe-7s-science",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  },
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "pe-7s-rocket",
    component: Upgrade,
    layout: "/admin"
  }
  */
];

export default dashboardRoutes;
