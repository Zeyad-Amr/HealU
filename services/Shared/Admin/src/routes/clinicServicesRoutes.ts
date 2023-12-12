import { Router } from "express";
import clinicServiceController from "../controllers/clinicServicesController";


const clinicServiceRouter = Router();

clinicServiceRouter.route("/")
            .get(clinicServiceController.getAllClinicServices)
            .post(clinicServiceController.createClinicService)

clinicServiceRouter.route("/:id")
            .get(clinicServiceController.getClinicServiceByServiceId)
            .patch(clinicServiceController.updateClinicService)
            .delete(clinicServiceController.deleteClinicService)

clinicServiceRouter.route("/clinic/:id")
            .get(clinicServiceController.getClinicServicesByClinicId)


export default clinicServiceRouter;