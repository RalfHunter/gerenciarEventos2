import z from 'zod';
const regexDate = /^\d{2}\/\d{2}\/\d{4}$/
// criar objeto evento com zod
export const Evento = z.object( {
    nome: z.string().min(5).max(25),
    data: z.string().refine((val) => regexDate.test(val), {
        message: "Data no formato inválido xx/xx/xxxx"
    }),
    usuario: z.number()
})

// tipa esse objeto eventos
export type tipoEvento = z.infer<typeof Evento>