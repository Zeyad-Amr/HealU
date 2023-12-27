import { Request, Response } from 'express';
import { errorHandler, hashing, jwt, validate } from '../services'
import axios from 'axios';


const login_user = async (req: Request, res: Response) => {
    try {
        const authError = {
            statusCode: 400,
            msg: "Invalid username or password"
        }
        // validate the body of the request
        const user = validate.validate(req.body, validate.loginSchema)

        // check if the username is correct
        const exist = await axios.get(`${process.env.REGISTRATION_URL as string}/user/${user.username}`)
            .then((res) => {
                if (!res.data.data.userId) throw { statusCode: 503, msg: res.data.data }
                return res.data.data
            }).catch((err) => {
                if (err?.response?.status === 404) throw authError
                else throw err
            })

        // check if the password is correct
        await hashing.compareHashPassword(user.password, exist.password, authError)

        const token = jwt.createToken({ sub: exist.userId })
        return res.status(200).json({ access_token: token })
    } catch (error: any) {
        const err = errorHandler(error)
        res.status(err?.statusCode ?? 500).json(err)
    }
}

export {
    login_user,
}