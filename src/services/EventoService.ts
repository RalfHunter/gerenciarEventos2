
import  sqlite3  from "sqlite3";
export const db = new sqlite3.Database('./data/banco.db')



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

export async function criarTabelaEvento() {
    const query = `
    CREATE TABLE IF NOT EXISTS eventos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    data DATE NOT NULL,
    usuario_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
    `
    return new Promise((resolve, reject) =>{
        db.run(query, erro =>{
            if(erro){
                reject(`Erro ao criar tabela eventos ${erro.message}`)
            }else {
                resolve(`Sucesso ao criar tabela eventos`)
            }
        })
    })
}

export async function inserirEvento(nome:string, data: Date, usuarioId:number) {
    const query = `INSERT INTO eventos(nome, data, usuario_id)
    VALUES (?, ?, ?)`

    return new Promise((resolve, reject) =>{
        db.run(query,[nome, data, usuarioId], erro => {
            if (erro){
                reject(erro.message)
            } else {
                resolve("Evento criado com sucesso")
            }
        })
    })
    
}