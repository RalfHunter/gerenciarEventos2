
import  sqlite3  from "sqlite3";
import { filePath } from "..";
const db = new sqlite3.Database(filePath+"banco.db")




// criar tabela evento
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

export async function listarEventos(): Promise <any> {
    const query = `SELECT * FROM eventos`

    return new Promise((resolve, reject) =>{
        db.all(query, (erro, rows) =>{
            if(erro){
                reject(erro)
            } else {
                resolve(rows)
            }
        })
    })
}

export async function listarEventoPorId(id:number){
    const query = `SELECT * FROM eventos WHERE eventos.id = ?`

    return new Promise((resolve, reject) =>{
        db.get(query,[id], function(erro, row) {
            if(erro){
                reject(erro)
            } else {
                resolve(row)
        }})
    })
}

export async function deletarEvento(id:number) {
    const query = `DELETE FROM eventos WHERE eventos.id = ?`

    return new Promise((resolve, reject) =>{
        db.run(query, [id], function(this: sqlite3.RunResult, erro){
            if(erro){
                reject(erro)
            } else {
                if(this.changes === 0){
                    console.log(`Nenhum evento encontrado com id ${id}`)
                    resolve(false)

                } else {
                    console.log(`Sucesso ao deletar evento`)
                    resolve(true)
                }
            }
        })
    })
}

export async function updateEvento(id:number, novoNome: string, novaData: Date) {
    const query = `UPDATE eventos SET nome = ?, data = ? WHERE id = ?`

    return new Promise((resolve, reject) =>{
        db.run(query,[novoNome, novaData, id], function(this: sqlite3.RunResult, erro){
            if(erro){
                reject(erro)
            } else {
                if(this.changes === 0){
                    console.log(`Nenhum evento com id ${id} encontrado`)
                    resolve(false)
                } else {
                    console.log("Evento atualizado com sucesso")
                    resolve(true)
                }
            }
        })
    })
    
}

