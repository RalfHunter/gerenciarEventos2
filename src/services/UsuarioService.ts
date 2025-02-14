import { db } from "./EventoService";
import { tipoUsuario } from "../models/UsuariosModels";

export async function inserirUsuario(dados:tipoUsuario) {
    const query = `INSERT INTO usuarios(nome, email, senha)
    VALUES (?, ?, ?)`

    return new Promise((resolve, reject) =>{
        db.run(query,[dados.nome, dados.email, dados.senha], erro =>{
            if(erro){
                reject(erro.message)
            } else {
                resolve(`Sucesso ao inserir usuário`)
            }
        })
    })
    
}

async function listarUsuarios() {
    const query = `SELECT * FROM usuarios`

    return new Promise((resolve, reject)=>{
        db.all(query, function(erro, rows){
            if(erro) {
                reject(erro)
            } else {
                resolve(rows)
            }
        })
    })
}
