import z from 'zod';

// cria objeto usuario com zod
export const Usuario = z.object({
    nome: z.string().min(4).max(20).regex(/[A-Z]/),
    email:z.string().email(),
    senha: z.string().min(8).regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[!@#$%¨&*()<>:?;]/)
})

// cria o tipo do objeto usuario
export type tipoUsuario = z.infer<typeof Usuario>