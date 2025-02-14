import { tipoUsuario } from "../models/UsuariosModels";
import { fakerPT_BR }from '@faker-js/faker';

const nome1 = fakerPT_BR.person.fullName()
const nome2 = fakerPT_BR.person.fullName()
const nome3 = fakerPT_BR.person.fullName()
export const usuario1:tipoUsuario = {
    nome: nome1,
    email: fakerPT_BR.internet.email({firstName:nome1.split(' ')[0]}),
    senha: nome1.split(' ')[0]+"123$%"
}

export const usuario2:tipoUsuario = {
    nome: nome2,
    email: fakerPT_BR.internet.email({firstName:nome1.split(' ')[0]}),
    senha: nome1.split(' ')[0]+"123$%"
}

export const usuario3:tipoUsuario = {
    nome: nome3,
    email: fakerPT_BR.internet.email({firstName:nome1.split(' ')[0]}),
    senha: nome1.split(' ')[0]+"123$%"
}