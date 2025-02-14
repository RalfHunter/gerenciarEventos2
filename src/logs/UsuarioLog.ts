import { number } from "zod";
import { acaoEnum } from "./EventoLog";

export const usuarioLog ={
    UUID:number,
    id_usuario: number,
    data: Date,
    acao:acaoEnum
}