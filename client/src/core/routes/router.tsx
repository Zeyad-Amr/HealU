import RouteModel from "./RouteModel";
import AppRoutes from "./AppRoutes";
import { ReactElement } from "react";
import { Route } from "react-router-dom";
import LandingPage from "../../modules/landing-page/pages";

class Router {
  static readonly routes: RouteModel[] = [
    {
      path: AppRoutes.home,
      element: <LandingPage />,
    },
  ];

  static getRoutes(): ReactElement[] {
    return Router.routes.map((route: RouteModel) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ));
  }
}

export default Router;
