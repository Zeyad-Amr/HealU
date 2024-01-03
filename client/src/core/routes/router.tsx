import RouteModel from "./RouteModel";
import AppRoutes from "./AppRoutes";
import { ReactElement } from "react";
import { Route } from "react-router-dom";
import LandingPage from "../../modules/landing-page/pages";
import DentalClinicPortal from "../../modules/clinics-portals/dental/pages";
import DermatologyClinicPortal from "../../modules/clinics-portals/dermatology/pages";
import NutritionClinicPortal from "../../modules/clinics-portals/nutrition/pages";
import OphthalmologyClinicPortal from "../../modules/clinics-portals/ophthalmology/pages";
import PediatricClinicPortal from "../../modules/clinics-portals/pediatric/pages";
import PatientPortal from "../../modules/patient-portal/pages/profile-page";
import AdminPortal from "../../modules/admin-portal/pages/doctors";
import Login from "../../modules/auth/pages";
import Signup from "../../modules/patient-portal/components/signup/SignUp";
import AppointmentsPage from "../../modules/patient-portal/pages/appointments-page";
import PreviousAppointments from "../../modules/patient-portal/pages/appointments";
import DoctorSlots from "../../modules/clinics-portals/orthopedic/pages/doctorSlot/doctorSlot";
import Patient from "../../modules/clinics-portals/orthopedic/pages/patient/patient";

class Router {
  static readonly routes: RouteModel[] = [
    {
      path: AppRoutes.home,
      element: <LandingPage />,
    },
    {
      path: AppRoutes.clinicDental,
      element: <DentalClinicPortal />,
    },
    {
      path: AppRoutes.clinicDermatology,
      element: <DermatologyClinicPortal />,
    },
    {
      path: AppRoutes.clinicNutrition,
      element: <NutritionClinicPortal />,
    },
    {
      path: AppRoutes.clinicOphthalmolgy,
      element: <OphthalmologyClinicPortal />,
    },
    {
      path: AppRoutes.clinicPediatric,
      element: <PediatricClinicPortal />,
    },
    {
      path: AppRoutes.patientPortalProfile,
      element: <PatientPortal />,
    },
    {
      path: AppRoutes.patientPortalAppointments,
      element: <AppointmentsPage />,
    },
    {
      path: AppRoutes.patientPortalPreviousAppointments,
      element: <PreviousAppointments />,
    },
    {
      path: AppRoutes.adminPortal,
      element: <AdminPortal />,
    },
    {
      path: AppRoutes.login,
      element: <Login />,
    },
    {
      path: AppRoutes.signup,
      element: <Signup />,
    },
    {
      path: AppRoutes.clinicOrthopedic,
      element: <DoctorSlots />,
    },
    {
      path: AppRoutes.orthoExamination,
      element: <Patient />,
    },
    
  ];

  static getRoutes(): ReactElement[] {
    return Router.routes.map((route: RouteModel) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ));
  }
}

export default Router;
