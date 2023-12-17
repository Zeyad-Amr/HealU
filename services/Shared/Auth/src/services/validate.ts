import Joi, { ObjectSchema } from "joi";
import passwordComplexity from "joi-password-complexity";

const passwordValidations = {
    min: 8,
    max: 1024,
    numeric: 1,
    requirementCount: 4,
};

const loginSchema = Joi.object({
    username: Joi.string().min(5).max(45).required(),
    password: passwordComplexity(passwordValidations).required(),
})

const postSchema = Joi.object({
    username: Joi.string().min(5).max(45).required(),
    password: passwordComplexity(passwordValidations).required(),
    userId: Joi.string().required(),
})

const updateSchema = Joi.object({
    username: Joi.string().min(5).max(45),
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
    postSchema,
    updateSchema,
    loginSchema,

}