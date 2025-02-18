import { Evento, tipoEvento } from "../models/EventosModels";
import { fakerPT_BR }from '@faker-js/faker';
export async function gerarEvento(id:number) {
    const evento ={
        nome: fakerPT_BR.lorem.sentence({min:1, max:3}),
        data: fakerPT_BR.date.future().toLocaleDateString("pt-BR"),
        usuario: id
    }
    return evento
    
}