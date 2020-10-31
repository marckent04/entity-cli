import fs from "fs";
import path from "path"

const src = "./src/modules"


export const getModules = () =>{
    try {
        return fs.readdirSync(src, {encoding: "utf8"})
            .filter(file => fs.lstatSync(path.join(src, file)).isDirectory())
    } catch (_) {
        return []
    }
}

const getModuleEntities = () => {}
