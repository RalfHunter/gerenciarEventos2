import { tipoUsuario, Usuario } from "../models/UsuariosModels";

// valida usuario com safeParse
export async function validarUsuario(usuario:tipoUsuario) {
    const valido = Usuario.safeParse(usuario)
    if(!valido.success){
        console.log(`Usuário não validado: ${valido.error.message}`)
        return false
    } else {
        console.log(`Usuário validado com sucesso`)
        return true
    }
    
}