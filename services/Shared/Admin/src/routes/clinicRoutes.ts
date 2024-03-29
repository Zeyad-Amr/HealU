import { Router } from "express";
import clinicController from "../controllers/clinicController";


const clinicRouter = Router();

clinicRouter.route("/")
            .get(clinicController.getAllClinics)
            .post(clinicController.createClinic)

clinicRouter.route("/:clinicId")
            .get(clinicController.getClinicByClinicId)
            .patch(clinicController.updateClinic)
            .delete(clinicController.deleteClinic)

clinicRouter.route("/many")
            .post(clinicController.createClinics)




export default clinicRouter;
