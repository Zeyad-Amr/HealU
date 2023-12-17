import { Request, Response } from 'express';
import { hashing, jwt, validate } from '../services'
import Auth from '../models/authModel';

const create_user = async (req: Request, res: Response) => {
    try {
        // validate the body of the request
        let user = validate.validate(req.body, validate.postSchema)
        // hashing the password 
        user.password = await hashing.hashPassword(user.password)

        const exist = await Auth.findOne({ $or: [{ username: user.username }, { userId: user.userId }] })
        if (exist) throw { statusCode: 400, msg: "User already exists" }

        // TODO: validate the userId from registration service

        const newUser = new Auth({ ...user })
        await newUser.save()

        return res.status(201).json({
            msg: "User created successfully"
        })
    } catch (err: any) {
        res.status(err?.statusCode ? err.statusCode : 500).json(err)
    }
}

const login_user = async (req: Request, res: Response) => {
    try {
        const authError = {
            statusCode: 400,
            msg: "Invalid username or password"
        }
        // validate the body of the request
        const user = validate.validate(req.body, validate.loginSchema)

        // check if the username is correct
        const exist = await Auth.findOne({ username: user.username })
        if (!exist) throw authError

        // check if the password is correct
        await hashing.compareHashPassword(user.password, exist.password, authError)

        const token = jwt.createToken({ sub: exist._id, userId: exist.userId })
        return res.status(200).json({ access_token: token })
    } catch (err: any) {
        console.log(err);

        res.status(err?.statusCode ? err.statusCode : 500).json(err)
    }
}

export {
    login_user,
    create_user
}