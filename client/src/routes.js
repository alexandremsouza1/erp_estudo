import AnuncioController from "modules/views/Anuncio/AnuncioController";
import DashboardController from "modules/views/Dashboard/DashboardController";
import ClienteController from "modules/views/Cliente/ClienteController";
import ControleEstoqueController from 'modules/views/Controle-estoque/ControlleEstoqueController'
import VendasController from 'modules/views/Vendas/VendasController'
import PerguntasController from 'modules/views/Perguntas/PerguntasController'

const dashboardRoutes = [{
  path: "/dashboard",
  name: "Dashboard",
  icon: "chart pie icon",
  component: DashboardController,
  layout: "/admin"
},
{
  path: "/user",
  name: "Anúncios",
  icon: "tags icon",
  component: AnuncioController,
  layout: "/admin"
},
{
  path: '/cliente',
  name: 'Clientes',
  icon: 'users icon',
  component: ClienteController,
  layout: '/admin'
},
{
  path: "/table",
  name: "Controle de estoque",
  icon: "edit icon",
  component: ControleEstoqueController,
  layout: "/admin"
},
{
  path: "/vendas",
  name: "Pedidos",
  icon: "cart icon",
  component: VendasController,
  layout: "/admin"
},
{
  path: "/icons",
  name: "Perguntas",
  icon: "conversation icon",
  component: PerguntasController,
  layout: "/admin"
},
{
  path: "/maps",
  name: "Resp. Automáticas",
  icon: "pencil alternate icon",
  component: VendasController,
  layout: "/admin"
}
];

export default dashboardRoutes;