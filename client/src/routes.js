import AnuncioController from "modules/views/Anuncio/AnuncioController";
import DashboardController from "modules/views/Dashboard/DashboardController";
import ClienteController from "modules/views/Cliente/ClienteController";
import Icons  from 'modules/views/Icons'

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: DashboardController,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "Anúncios",
    icon: "pe-7s-user",
    component: AnuncioController,
    layout: "/admin"
  },
  {
    path:'/cliente',
    name: 'Clientes',
    icon: 'pe-7s-user',
    component: ClienteController,
    layout: '/admin'
  },
  {
    path: "/table",
    name: "Controle de estoque",
    icon: "pe-7s-note2",
    component: Icons,
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
