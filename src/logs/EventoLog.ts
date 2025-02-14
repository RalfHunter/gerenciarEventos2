import { number } from "zod";

export enum acaoEnum  {
    INSERIR = 'INSERIR',
    DELETAR = 'DELETAR',
    ATUALIZAR = 'ATUALIZAR'
}

export const eventoLog = {
    uuid: number,
    id_usuario: number,
    data: Date,
    acao:acaoEnum
}