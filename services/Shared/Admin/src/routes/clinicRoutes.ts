import { Router } from "express";
import clinicController from "../controllers/clinicController";


const clinicRouter = Router();

clinicRouter.route("/")
            .get(clinicController.getAllClinics)
            .post(clinicController.createClinic)
        
clinicRouter.route("/:id")
            .get(clinicController.getClinicByClinicId)
            .patch(clinicController.updateClinic)
            .delete(clinicController.deleteClinic)


clinicRouter.route("/doctor/:id")
                .get(clinicController.getClinicByDoctorId)

clinicRouter.route("/service/:id")
                .get(clinicController.getClinicByServiceId)


export default clinicRouter;