import RouteModel from "./RouteModel";
import AppRoutes from "./AppRoutes";
import { ReactElement } from "react";
import { Route } from "react-router-dom";

import Appointments from "../../modules/clinics-portals/ophthalmology/pages/appointments";

class Router {
  static readonly routes: RouteModel[] = [
    {
      path: AppRoutes.clinicOphthalmolgy + "/appointments",
      element: <Appointments />,
    },
  ];

  static getRoutes(): ReactElement[] {
    return Router.routes.map((route: RouteModel) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ));
  }
}

export default Router;
