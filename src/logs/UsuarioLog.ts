
import * as fs from 'fs';
import { filePath } from '..';

// função para escrever logs do tipo usuario
export async function escreverLogUsuario(usuarioLog:object) {
    fs.appendFileSync(filePath+"usuario.log",JSON.stringify(usuarioLog)+"\n", "utf-8")
    return usuarioLog
}