interface RouteModel {
  path: string;
  element: JSX.Element;
  children?: RouteModel[];
  isPrivate?: boolean;
}

export default RouteModel;
