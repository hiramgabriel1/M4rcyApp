import path from 'path'
import { fileURLToPath } from 'url'
import verifyFileExist from '../../helpers/verifyFIleExist.js'
/*dirname no está definido en los módulos ES6, por lo que no se puede usar en importaciones. entonces usamos fileURLToPath
que convierte la url (url que es el modulo actual en node.js) en una ruta de archivo y luego usamos path.dirname para obtener la ruta de la carpeta uploads*/
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
export default function getAvatars(req, res) {
    const { filename } = req.params
    try {
        const filePath = path.join(__dirname, '../../uploads', filename)
        if (!verifyFileExist(filePath)) {
            // res.status(404).json({ error: "File not found" })
            console.log("no existe el archivo");
            return
        }
        res.sendFile(filePath)

    } catch (error) {
        res.status(500).json({ error: "Error getting file" })
    }
}

