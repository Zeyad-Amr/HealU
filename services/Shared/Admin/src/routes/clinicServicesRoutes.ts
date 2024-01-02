import { Router } from "express";
import clinicServiceController from "../controllers/clinicServicesController";


const clinicServiceRouter = Router();

clinicServiceRouter.route("/")
            .get(clinicServiceController.getAllClinicServices)
            .post(clinicServiceController.createClinicService)

clinicServiceRouter.route("/:serviceId")
            .get(clinicServiceController.getClinicServiceByServiceId)
            .patch(clinicServiceController.updateClinicService)
            .delete(clinicServiceController.deleteClinicService)

clinicServiceRouter.route("/many")
            .post(clinicServiceController.createClinicServices)

export default clinicServiceRouter;
