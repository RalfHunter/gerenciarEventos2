
import  sqlite3  from "sqlite3";
const db = new sqlite3.Database('./data/banco.db')



async function criarTabelaUsuario() {
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

async function criarTabelaEvento() {
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