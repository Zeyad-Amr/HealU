import RouteModel from "./RouteModel";
import AppRoutes from "./AppRoutes";
import { ReactElement } from "react";
import { Route } from "react-router-dom";
// import LandingPage from "../../modules/landing-page/pages";
// import DentalClinicPortal from "../../modules/clinics-portals/dental/pages";
// import DermatologyClinicPortal from "../../modules/clinics-portals/dermatology/pages";
// import NutritionClinicPortal from "../../modules/clinics-portals/nutrition/pages";
// import OphthalmologyClinicPortal from "../../modules/clinics-portals/ophthalmology/pages";
// import PediatricClinicPortal from "../../modules/clinics-portals/pediatric/pages";
// import PatientPortal from "../../modules/patient-portal/pages/profile-page";
// import AdminPortal from "../../modules/admin-portal";
import Appointments from "../../modules/clinics-portals/ophthalmology/pages/appointments";

class Router {
  static readonly routes: RouteModel[] = [
    {
      path: AppRoutes.clinicOphthalmolgy + "/appointments",
      element: <Appointments />,
    },
    // {
    //   path: AppRoutes.home,
    //   element: <LandingPage />,
    // },
    // {
    //   path: AppRoutes.clinicDental,
    //   element: <DentalClinicPortal />,
    // },
    // {
    //   path: AppRoutes.clinicDermatology,
    //   element: <DermatologyClinicPortal />,
    // },
    // {
    //   path: AppRoutes.clinicNutrition,
    //   element: <NutritionClinicPortal />,
    // },
    // {
    //   path: AppRoutes.clinicOphthalmolgy,
    //   element: <OphthalmologyClinicPortal />,
    // },
    // {
    //   path: AppRoutes.clinicPediatric,
    //   element: <PediatricClinicPortal />,
    // },
    // {
    //   path: AppRoutes.patientPortal,
    //   element: <PatientPortal />,
    // },
    // {
    //   path: AppRoutes.adminPortal,
    //   element: <AdminPortal />,
    // },
  ];

  static getRoutes(): ReactElement[] {
    return Router.routes.map((route: RouteModel) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ));
  }
}

export default Router;
