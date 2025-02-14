import { rl, questionAsync } from "../models/AsyncQuestion"
import { validarEvento } from "../validation/EventoValidation"
import { inserirEvento } from "../services/EventoService"
export async function criarEvento(usuario_id: number) {
    try {
        const nomeEvento = await questionAsync("Nome do Evento: ")
        const dataEvento = new Date(await questionAsync("Data do Evento")) || new Date()
        const resposta = await validarEvento({ nome: nomeEvento, data: dataEvento, usuario: usuario_id })
        if (resposta === true) {
            inserirEvento(nomeEvento, dataEvento, usuario_id)
        }
    } catch(erro) {
        console.log(`Erro ao criar inserir novo evento: ${erro}`)
    }
    
    }