import { Evento, tipoEvento } from "../models/EventosModels";

export async function validarEvento(evento:tipoEvento) {
    const valido = Evento.safeParse({evento})
    if(!valido.success){
        console.log(`Evento não validado: ${valido.error.message}`)
        return false
    }else{
        console.log("Evento validado com sucesso")
        return true
    }
    
}