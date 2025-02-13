import z from 'zod';

export const Evento = z.object( {
    nome: z.string().min(5).max(25),
    data: z.date(),
    usuario: z.number()
})

export type tipoEvento = z.infer<typeof Evento>