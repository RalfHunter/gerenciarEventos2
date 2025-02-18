import { questionAsync } from "../models/AsyncQuestion"
import { validarEvento } from "../validation/EventoValidation"
import { converterData, deletarEvento, inserirEvento, listarEventoPorId, updateEvento } from "../services/EventoService"
import { listarEventos } from "../services/EventoService"
import { listarUsuarios } from "../services/UsuarioService"
import { gerarEvento } from "../seeds/EventoSeed"
import { tipoEvento } from "../models/EventosModels"
import { acaoEnum, escreverLogEvento } from "../logs/EventoLog"
import {v4 as uuidv4} from 'uuid';

export async function criarEventosDefault() {
    let objetos:tipoEvento[] = []
    try{
        // Baseado na lista de usuário ele gera até 3 logas
        // pegando o id dos 3 primeiros usuario de forma inversa
        const usuarios = await listarUsuarios()
        const eventos = await listarEventos()
        for(let i:number = 3 - eventos.length; i > 0; i--){
            const eventoGerado = await gerarEvento(usuarios[i-1].id)
            await inserirEvento(eventoGerado.nome, eventoGerado.data, eventoGerado.usuario)
            objetos.push(eventoGerado)
            await escreverLogEvento({"UUID": uuidv4(),
                "ID_USUARIO": "SISTEMA",
                "DATA":new Date(),
                "AÇÃO": acaoEnum.INSERIR
       }) 
        }
    }catch(erro){
        console.log(`Erro ao inserir eventos: ${erro}`)
    }
}

export async function criarEvento(id:number){
    const eventoDados:tipoEvento = {
        nome: await questionAsync("Nome: ") || "Default",
        data: await converterData(new Date(await questionAsync("Data(Opcional): ")|| new Date())),
        usuario: id
    }
    //console.log(eventoDados)
    const evento = await validarEvento(eventoDados)
    if(evento === true){
        await inserirEvento(eventoDados.nome, eventoDados.data, eventoDados.usuario)
        await escreverLogEvento({
            "UUID":uuidv4(),
            "ID_USUARIO": eventoDados.usuario,
            "DATA": new Date(),
            "Ação": acaoEnum.INSERIR,
        })
        console.log("Evento criado com sucesso")
    } 
}
// chama as funções necessárias para deletar um evento e gerar o log
export async function excluirEvento(idUser:number){
    try{
        const idEvento = parseInt(await questionAsync("Id: ")) 
        const resultado = await deletarEvento(idEvento)
        if(resultado === true){
            await escreverLogEvento({
                "UUID": uuidv4(),
                "ID_USUARIO": idUser,
                "DATA": new Date(),
                "AÇÃO": acaoEnum.DELETAR
            })
        }
    } catch(erro){
        console.log(`Erro ao deletar evento ${erro}`)
    } 
}
// chama as funções necessárias para atualizar um evento e gerar o log
export async function atualizarEvento(idUsuario:number){
    try{
    const idEvento = parseInt(await questionAsync("id: "))
    const resultado = await listarEventoPorId(idEvento)
    if(resultado === undefined){
        console.log(`Nenhum evento encontrado com id ${idEvento}`)
        return
    }

    const eventoAlterado:tipoEvento = {
        nome: await questionAsync("Nome: "),
        data: await converterData(new Date(await questionAsync("Data(Opcional): ")|| new Date())),
        usuario: idUsuario
    }
    const evento = await validarEvento(eventoAlterado)
    if(evento === true){
        await updateEvento(idEvento, eventoAlterado.nome, eventoAlterado.data)
        await escreverLogEvento({
            "UUID": uuidv4(),
            "ID_USUARIO": idUsuario,
            "DATA": new Date (),
            "AÇÃO": acaoEnum.ATUALIZAR
        })
    }
    } catch (erro){
        console.log(`Erro ao atualizar evento ${erro}`)
    }
}

// // chama as funções necessárias para listar um evento
export async function listarEvento() {
    const id = parseInt(await questionAsync('id: '))
    try{
        const resposta = await listarEventoPorId(id)
        if(resposta != undefined){
            console.table(resposta)
        } else {
            console.log(`Nenhum usuário com id ${id} foi encontrado`)
        }
    } catch (erro) {
        console.log(`Erro ao listar usuario por id: ${erro}`)
    }
    
}
// chama as funções necessárias para listar todos os eventos
export async function listarTodosEventos(){
    try{
        const eventos = await listarEventos()
        if(eventos != undefined){
            console.table(eventos)

        } else {
            console.log("Nenhum evento encontrado")
        }
    }catch(erro){

    }
}
// chama as funções necessárias para gerar um evento fake
export async function gerarFakeEvento(idUsuario:number){
    try{
        const eventoFake = await gerarEvento(idUsuario)
        await inserirEvento(eventoFake.nome, eventoFake.data, eventoFake.usuario)
        await escreverLogEvento({
            "UUID": uuidv4(),
            "ID_USUARIO": idUsuario,
            "DATA": new Date (),
            "AÇÃO": acaoEnum.INSERIR
        })
        console.log("Evento Fake gerado")
    } catch(erro) {
        console.log(`Ocorreu um erro ao gerar evento fake ${erro}`)
    }
}