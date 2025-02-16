import { tipoUsuario } from "../models/UsuariosModels";
import { fakerPT_BR }from '@faker-js/faker';
import { listarUsuarios } from "../services/UsuarioService";
import { resolve } from "path";
import { rejects } from "assert";
import { error } from "console";

export const marco: tipoUsuario = {
    nome:"Marco",
    email:"marco@gmail.com",
    senha:"Marco123$%"
}

export async function gerarUsuario() {
    
    const nome = fakerPT_BR.person.fullName()
    const ultimoNome = nome.split(' ')
    //console.log(ultimoNome[ultimoNome.length-1])
    const usuario4:tipoUsuario = {
        nome: nome,
        email: fakerPT_BR.internet.email({firstName:nome.split(' ')[0],lastName:ultimoNome[ultimoNome.length -1] }),
        senha: nome.split(' ')[0]+"123$%"
        
    }
    return usuario4
    

}
    
