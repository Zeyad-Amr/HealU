import Joi, { ObjectSchema } from "joi";


const loginSchema = Joi.object({
    username: Joi.string().min(5).max(45).required(),
    password: Joi.string().min(8).required(),
})

const bookApptSchema = Joi.object({
    appointment: Joi.object().length(2).required(),
    card: Joi.object().length(4).required(),
})

const slotSchema = Joi.object({
    weekDay: Joi.string().valid('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday').required(),
    time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/, "format HH:MM").required(),
})


const validate = (input: any, schema: ObjectSchema) => {
    const result = schema.validate(input);
    if (result.error) {
        throw {
            statusCode: 400,
            msg: result.error.details[0]?.message
        }
    }
    return result.value
}

export default {
    validate,
    loginSchema,
    bookApptSchema,
    slotSchema

}