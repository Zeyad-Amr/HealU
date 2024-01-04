class AppRoutes {
  static readonly home: string = "/";
  static readonly clinicDental = "/clinic/dental";
  static readonly clinicDermatology = "/clinic/dermatology";
  static readonly clinicNutrition = "/clinic/nutrition";
  static readonly clinicOphthalmolgy = "/clinic/ophthalmolgy";
  static readonly clinicOrthopedic = "/clinic/orthopedic";
  static readonly clinicPediatric = "/clinic/pediatric";
  static readonly adminPortal = "/admin";
  static readonly login = "/login";
  static readonly signup = "/signup";
  static readonly patientPortalProfile = "/patient/profile";
  static readonly patientPortalAppointments = "/patient/appointments";
  static readonly patientPortalPreviousAppointments =
    "/patient/previous-appointments";
  // dental routes
  static readonly clinicDentalExamination = "/clinic/dental/examination";
  static readonly aboutUs = "/about-us";
  static readonly contactUs = "/contact-us";
  static readonly Analytics = "/analytics";
  static readonly patientPortalUpcomingAppointments =
    "/patient/upcoming-appointments";
}

export default AppRoutes;
