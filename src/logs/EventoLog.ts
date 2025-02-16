import { number } from "zod";
import * as fs from 'fs'
import { filePath } from "..";

// Enum contendo as opções inserir, deletar e atualizar
export enum acaoEnum  {
    INSERIR = 'INSERIR',
    DELETAR = 'DELETAR',
    ATUALIZAR = 'ATUALIZAR'
}


// função para escrever logs do tipo evento
export async function escreverLogEvento(eventoLog:object) {
    fs.appendFileSync(filePath+"evento.log",JSON.stringify(eventoLog)+"\n", "utf-8")
    return eventoLog
}