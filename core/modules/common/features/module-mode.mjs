import fs from "fs";
import path from "path"
import {getSrcPathFormConfigFile} from "../configFile.mjs"


export const getModules = () =>{
    const src = getSrcPathFormConfigFile()
    try {
        return fs.readdirSync(src, {encoding: "utf8"})
            .filter(file => fs.lstatSync(path.join(src, file)).isDirectory())
    } catch (_) {
        return []
    }
}

const getModuleEntities = () => {}
