import { tipoUsuario } from "../models/UsuariosModels";
import { inserirUsuario } from "../services/UsuarioService";
import { usuario1 } from "../seeds/UsuarioSeed";
import { gerarUsuario } from "../seeds/UsuarioSeed";

export async function criarUsuariosDefault(usuario:tipoUsuario) {
    try{
        for(let i:number = 3; i > 0; i--){
            await inserirUsuario(await gerarUsuario())

        }
    } catch (erro){
        console.log(`Erro ao inserir usuario ${erro}`)
    }
}