import { tipoUsuario } from "../models/UsuariosModels";
import { inserirUsuario } from "../services/UsuarioService";
export async function criarUsuariosDefault(usuario:tipoUsuario) {
    try{
        await inserirUsuario(usuario)
    } catch (erro){
        console.log(`Erro ao inserir usuario ${erro}`)
    }
}