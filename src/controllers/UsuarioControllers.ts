import { tipoUsuario } from "../models/UsuariosModels";
import { deletarUsuario, inserirUsuario, listarUsuarioPorId, listarUsuarios, updateUsuario } from "../services/UsuarioService";
import { gerarUsuario, marco } from "../seeds/UsuarioSeed";
import { escreverLogUsuario } from "../logs/UsuarioLog";
import { v4 as uuidv4 } from 'uuid';
import { questionAsync } from "../models/AsyncQuestion";
import { validarUsuario } from "../validation/UsuarioValidation";
import { acaoEnum } from "../logs/EventoLog";

// função necessário para criar usuarios default
export async function criarUsuariosDefault() {
    let objetos: tipoUsuario[] = []
    try {
        const array = await listarUsuarios()
        for (let i: number = 3 - array.length; i > 0; i--) {
            const usuarioGerado = await gerarUsuario()
            await inserirUsuario(usuarioGerado)
            // Gerar log
            await escreverLogUsuario({
                "UUID": uuidv4(),
                "ID_USUARIO": "SISTEMA",
                "DATA": new Date (),
                "AÇÃO": acaoEnum.INSERIR
            })
            objetos.push(usuarioGerado)
        }
        const novoArray = await listarUsuarios() as tipoUsuario[]
        // Percorre a lista para ver se o usuario com email marco@gmail existe
        // se não exister insere no banco e adiciona os logs
        const marcoExiste = novoArray.some(item => item.email === marco.email)
        if (marcoExiste === false) {
            await inserirUsuario(marco)
            await escreverLogUsuario(
                {
                    "UUID": uuidv4(),
                    "ID_USUARIO": "SISTEMA",
                    "DATA": new Date(),
                    "AÇÃO": acaoEnum.INSERIR,
                })
        }
    } catch (erro) {
        console.log(`Erro ao inserir usuario ${erro}`)

    } 
}
// chama funções necessárias para criar um usuário e seus logs
export async function criarUsuario(idUsuario: number) {
    try {
        // criar objeto do tipoUsuario
        const usuario: tipoUsuario = {
            nome: await questionAsync("Nome: "),
            email: await questionAsync("Email: "),
            senha: await questionAsync("Senha: ")
        }
        // valida Usuario
        const resposta = await validarUsuario(usuario)
        if (resposta === false) {
            return
        }
        await inserirUsuario(usuario)
        await escreverLogUsuario({
            "UUID": uuidv4(),
            "ID_USUARIO": idUsuario,
            "DATA": new Date(),
            "AÇÃO": acaoEnum.INSERIR,

        })
        console.log("Usuario criado com sucesso")
    } catch (erro) {
        console.log(`Erro ao criar usuário: ${erro}`)
    }

}
// chama funções necessárias para deletar um usuário e seus logs
export async function excluirUsuario(idUsuarioLogado: number) {
    try {
        const idAlvo = parseInt(await questionAsync("id: "))
        const usuario = await listarUsuarioPorId(idAlvo)
        if (usuario != undefined) {
            // Se o usuario for retornado for o mesmo do logado ele faz uma pergunta
            // caso resposta seja sim, o usuario será deletado após sair
            // porém se ele fizer novamente a mesma pergunta e retorna false
            // o usuario não será mais excluido
            if (idAlvo === idUsuarioLogado) {
                let resposta: string = await questionAsync("('s' para deletar ou qualquer outra tecla para negar): ")
                if (resposta.toLowerCase() === "s") {
                    return true
                } else {
                    console.log("O usuario não será mais deletado")
                    return false
                }

            } else {
                // deleta usuario caso exista
                await deletarUsuario(idAlvo)
                // escreve logs de usuario
                await escreverLogUsuario({
                    "UUID": uuidv4(),
                    "ID_USUARIO": idUsuarioLogado,
                    "DATA": new Date(),
                    "AÇÃO": acaoEnum.DELETAR
                })
                console.log(`Usuário com id ${usuario.id} com nome de ${usuario.nome} deletado com sucesso`)
                
            }
        }
    } catch (erro) {
        console.log(`Erro ao deletar usuário: ${erro}`)
    }
}
// chama funções necessárias para atualizar um usuário e seus logs
export async function atualizarUsuario(idUsuario: number) {
    try{
        const id = parseInt(await questionAsync("id: "))
        // valida Usuario
        const resultado = await listarUsuarioPorId(id)
        if(resultado != undefined){
            const atualizadoUsuario:tipoUsuario = {
                nome: await questionAsync("Novo nome: ") || resultado.nome,
                email: await questionAsync("Novo email: ") || resultado.email,
                senha: await questionAsync("Nova senha:") || resultado.senha
            }
            // valida usuario
            const validado = await validarUsuario(atualizadoUsuario)
            // encurto o nome pra ficar mais fácil de escrever :)
            const up = atualizadoUsuario
            if(validado === true){
                await updateUsuario(id, up.nome, up.email, up.senha)
                // escreve logs de usuario
                await escreverLogUsuario({
                    "UUID": uuidv4(),
                    "ID_USUARIO": idUsuario,
                    "DATA": new Date(),
                    "AÇÃO": acaoEnum.ATUALIZAR
                })
            }
        } else {
            console.log(`Nenhum usuário com id ${id} encontrado`)
        }
    }catch (erro){
        console.log(`Erro ao atualizara usuário: ${erro}`)
    }
}
// chama funções necessárias para listar um usuário
export async function procurarUsuarioId(){
    try{
        const id = parseInt(await questionAsync("id: "))
        const resultado = await listarUsuarioPorId(id)
        if(resultado != undefined){
            console.table(resultado)
        } else {
            console.log(`Nenhum usuário com id ${id} encontrado`)
        }
    } catch (erro){
        console.log(`Erro ao listar usuario: ${erro}`)
    }

}
// chama funções necessárias para listar todos os usuários
export async function procurarUsuarios(){
    try{
        const resultado = await listarUsuarios()
        if(resultado != undefined){
            console.table(resultado)
        } else {
            console.log(`Nenhum usuário encontrado, isso é estranho-`)
            console.log(`porque para aparecer essa mensagem ao menos um usuário-`)
            console.log(`precisa existir no banco de dados.`)
            console.log(`o que você fez?`)
        }
    } catch(erro){
        console.log(`Erro ao listar usuario: ${erro}`)
    }
}
// chama funções necessárias para criar um usuário fake e seus logs
export async function gerarUsuarioFake(idUsuario:number) {
    try{
        // criar objeto do tipoUsuario
        const usuario:tipoUsuario = await gerarUsuario()
        await inserirUsuario(usuario)
        // escreve logs de usuario
        await escreverLogUsuario({
            "UUID": uuidv4(),
            "ID_USUARIO": idUsuario,
            "DATA": new Date(),
            "AÇÃO": acaoEnum.INSERIR
        })
        console.log("Usuario fake gerado com sucesso")
    }catch (erro){
        console.log(`Erro ao gerar usuario fake ${erro}`)
    }
}