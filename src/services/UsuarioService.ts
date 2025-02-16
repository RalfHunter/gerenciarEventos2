import { filePath } from "..";
import { tipoUsuario } from "../models/UsuariosModels";
import  sqlite3  from "sqlite3";
const db = new sqlite3.Database(filePath+"banco.db")

// cria tabela usuario
export async function criarTabelaUsuario() {
    const query = `
    CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
    )
    `
    return new Promise((resolve, reject)=>{
        db.run(query, erro =>{
            if(erro){
                reject(`Erro ao criar tabela usuarios: ${erro}`)
            } else {
                resolve(`Sucesso ao criar tabela usuarios`)
            }
        })
    })
    
}

// função para adicionar novo usuário
export async function inserirUsuario(usuario:tipoUsuario) {
    const query = `INSERT INTO usuarios(nome, email, senha)
    VALUES (?, ?, ?)`

    return new Promise((resolve, reject) =>{
        db.run(query,[usuario.nome, usuario.email, usuario.senha], erro =>{
            if(erro){
                reject(erro.message)
            } else {
                resolve(`Sucesso ao inserir usuário`)
            }
        })
    })
    
}
// função para listar todos os usuarios
export async function listarUsuarios(): Promise <any> {
    const query = `SELECT * FROM usuarios`

    return new Promise((resolve, reject)=>{
        db.all(query, function(erro, rows){
            if(erro) {
                reject(erro.message)
            } else {
                resolve(rows)
            }
        })
    })
}

// função responsável por verificar os dados de login
export async function listarUsuariosEmail(email:string, senha:string): Promise <any> {
    const query = `SELECT * FROM usuarios WHERE usuarios.email = ? and usuarios.senha = ?`

    return new Promise((resolve, reject)=>{
        db.get(query,[email, senha], function(erro, row){
            if(erro) {
                reject(erro)
            } else {
                resolve(row)
            }
        })
    })
}

// Para deletar usuários
export async function deletarUsuario(idUsuario:number) {
    const query = `DELETE FROM usuarios WHERE usuarios.id = ?`
    return new Promise((resolve, reject) =>{
        db.run(query,[idUsuario], function(this: sqlite3.RunResult, erro){
                if(erro){
                    reject(erro.message)
                } else {
                    if(this.changes === 0){
                        resolve(`Nenhum usuario com id ${idUsuario} encontrado`)
                    } else {
                        resolve(`Usuário deletado com sucesso`)
                    }
                }
        })
    })
}
// listar por id
export async function listarUsuarioPorId(idUsuario:number): Promise <any> {
    const query = `SELECT * FROM usuarios WHERE usuarios.id = ?`

    return new Promise((resolve, reject)=>{
        db.get(query,[idUsuario], function(erro, rows){
            if(erro) {
                reject(erro.message)
            } else {
                resolve(rows)
            }
        })
    })
}
// para fazer update no sql
export async function updateUsuario(idUsuario:number, novoNome:string, novoEmail:string, novaSenha:string){
    const query = `UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?`

    return new Promise((resolve, reject) =>{
        db.run(query,[novoNome, novoEmail, novaSenha, idUsuario ], function(this: sqlite3.RunResult, erro){
            if(erro){
                reject(erro.message)
            } else {
                if(this.changes === 0){
                    resolve(`Nenhuma usuario correspondente encontrado`)
                } else {
                    resolve(`Usuário atualizado com sucesso`)
                }
            }
        })
    })

}