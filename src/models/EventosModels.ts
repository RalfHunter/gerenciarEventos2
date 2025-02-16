import z from 'zod';

// criar objeto evento com zod
export const Evento = z.object( {
    nome: z.string().min(5).max(25),
    data: z.date(),
    usuario: z.number()
})

// tipa esse objeto eventos
export type tipoEvento = z.infer<typeof Evento>