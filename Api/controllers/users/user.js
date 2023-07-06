import User from '../../models/user.model.js'
import { encryptPassword } from '../../helpers/handleBycript.js'
import { validateEMail, validatePassWord } from '../../validators/validatorUser.js'

const getUser = async (req, res) => {
    const { id } = req.params
    try {
        await User.sync()
        const user = await User.findOne({ where: { id } })


        if (!user || Object.keys(user).length === 0) {
            res.status(404).json({ erro: "User not found id is malformed" })
            return
        }
        const userWhitAvatar = {
            ...user,
            avatar: `http://localhost:3000/api/avatars/${user.avatar}`,
        }
        res.status(200).json({ ...userWhitAvatar.dataValues })
    } catch (error) {
        console.log(error)
    }
}


const createUser = async (req, res) => {
    const { firstName, lastName, email, password, country, LinkReds } = req.body


    try {
        await User.sync()
        const passwordLength = validatePassWord(password)
        const userExist = await validateEMail(email)
        if (userExist) {
            res.status(409).json({ error: 'Email in use' })
            return
        }

        if (passwordLength) {
            res.status(409).json({ error: 'Password whith char < 8' })
            return
        }


        const socialNetworkUser = {}
        const socialNetworksDefault = [
            { name: 'facebook' },
            { name: 'twitter' },
            { name: 'instagram' }
        ]

        //Verificamos si se subio un archivo, sino se coloca la imagen por defecto al usuario
        let avatar = "userDefaul.png"
        if (req.file && req.file.filename) {
            avatar = req.file.filename
        }
        //Encryptamos la contraseña
        const passwordHas = await encryptPassword(password)




        /*ahora vamos a guardar las redes sociales del usuario en un array de  donde el nombre de la red social será la clave
        y el valor el link o su perfil*/
        for (let i = 0; i < socialNetworksDefault.length; i++) {
            const socialNetwork = socialNetworksDefault[i];
            const linkRed = LinkReds[i] || null

            socialNetworkUser[socialNetwork.name] = linkRed
        }


        //creamos el objecto previamente con la contraseña encryptada y avatar
        const newUser = await User.create({ avatar, firstName, lastName, email, password: passwordHas, country, socialNetworks: socialNetworkUser })

        if (newUser) {
            res.status(201).json({ ...newUser.dataValues })
            return
        }

    } catch (error) {
        console.log("error:", error)
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params
    const { firstName, lastName, password, LinkReds, country } = req.body


    try {
        await User.sync()

        const socialNetworksDefault = [
            { name: 'facebook' },
            { name: 'twitter' },
            { name: 'instagram' }
        ]
        let LinkRedsUser
        if (LinkReds && Array.isArray(LinkReds)) {
            LinkRedsUser = LinkReds
        } else {
            LinkRedsUser = [null, null, null]
        }


        const user = await User.findOne({ where: { id } })


        if (!user || Object.keys(user).length === 0) {
            res.status(404).json({ erro: "User not found id is malformed" })
        }
        //Verificamos si se subio un archivo, sino se coloca la imagen que encontramos en la base de datos
        let avatar = user.dataValues.avatar
        if (req.file && req.file.filename) {
            avatar = req.file.filename
        }

        //Encryptamos la contraseña si es que se envio una nueva
        let passwordHas = user.dataValues.password



        if (password) {

            const passwordLength = validatePassWord(password)

            if (passwordLength) {
                res.status(409).json({ error: 'Password whith char < 8' })
                return
            }
            passwordHas = await encryptPassword(password)
        }
        //Actualizamos el usuario

        const existingSocialNetWOrks = user.dataValues.socialNetworks


        const socialNetworkUserUpdate = { ...existingSocialNetWOrks }

        for (let i = 0; i < socialNetworksDefault.length; i++) {
            const socialNetwork = socialNetworksDefault[i];
            console.log(socialNetwork)
            const linkRed = LinkRedsUser[i]
            console.log(linkRed);


            // revisamos si el usuario tiene esa propiedad y viene algo en esa poscion y actualizamos sino dejamos el por defecto
            if (existingSocialNetWOrks.hasOwnProperty(socialNetwork.name) && LinkRedsUser[i] !== null) {

                socialNetworkUserUpdate[socialNetwork.name] = linkRed
            } else {
                console.log("entre aqui", i);

                socialNetworkUserUpdate[socialNetwork.name] = existingSocialNetWOrks[socialNetwork.name]
            }

            if (!existingSocialNetWOrks.hasOwnProperty(socialNetwork.name) && LinkRedsUser[i] !== null) {
                socialNetworkUserUpdate[socialNetwork.name] = linkRed
            }
        }



        const userUpdate = {
            avatar: avatar,
            firstName: firstName || user.dataValues.firstName,
            lastName: lastName || user.dataValues.lastName,
            password: passwordHas,
            email: user.dataValues.email,
            country: country || user.dataValues.country,
            socialNetworks: socialNetworkUserUpdate
        }



        await User.update(userUpdate, { where: { id } })

        res.status(200).json({ userUpdate })


    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error updating user' });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        await User.sync()


        const user = await User.findOne({ where: { id } })
        if (!user || Object.keys(user).length === 0) {
            res.status(404).json({ erro: "User not found id is malformed" })
            return
        }
        await User.destroy({ where: { id } })
        res.status(200).json({ message: "User deleted" })
    } catch (error) {
        console.log(error)

    }
}

export {
    getUser, createUser, updateUser, deleteUser
}