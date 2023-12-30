import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
    //hash password using bcrypt package
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password

}

const compareHashPassword = async (password: string, existPassword: string, error: any) => {
    // compare password w/ hashed password in database using bcrypt package
    try {
        const validPass = await bcrypt.compare(password, existPassword);
        if (!validPass) {
            throw error
        }
    } catch (error) {
        throw error
    }
}

export default {
    hashPassword,
    compareHashPassword
}
