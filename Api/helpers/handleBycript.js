import bcrypt from 'bcrypt'

const encryptPassword = async (textPlane) => {


    const hash = await bcrypt.hash(textPlane, 10)
    return hash
}

const comparePassword = async (textPlane, userPasswordHas) => {
    return await bcrypt.compare(textPlane, userPasswordHas)
}
export { encryptPassword, comparePassword }