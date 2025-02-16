const path = require('path')
// resolve possiveis problemas com o caminho
const absolutePath = path.resolve(__dirname, 'index.js')
// cria uma propriedade para receber o caminho
let path_empty:string = ''

// resolve problemas de diretório, tanto para arquivo.js e arquivo.ts
if (absolutePath.includes("dist")){
    path_empty = '../data/'
}
else{
    path_empty = './data/'
}

// agora ele atribui o valor de path_empty para o filePath
export let filePath:string = path_empty



import { criarTabelaUsuario } from "./services/UsuarioService";
import { criarTabelaEvento } from "./services/EventoService";
import { atualizarUsuario, criarUsuario, criarUsuariosDefault, excluirUsuario, gerarUsuarioFake, procurarUsuarioId, procurarUsuarios } from "./controllers/UsuarioControllers";
import { atualizarEvento, criarEvento, criarEventosDefault, excluirEvento, gerarFakeEvento, listarEvento, listarTodosEventos } from "./controllers/EventoContollers";
import { deletarUsuario, listarUsuariosEmail} from "./services/UsuarioService";
import { escreverLogUsuario } from "./logs/UsuarioLog";
import {v4 as uuidv4} from 'uuid';
import { questionAsync, rl } from "./models/AsyncQuestion";
import { acaoEnum } from "./logs/EventoLog";


async function main() {
    // Cria todas as tabelas
    await criarTabelaUsuario()
    await criarTabelaEvento()
    // Cria 4 usarios sendo o Marco
    await criarUsuariosDefault()
    // Cria 3 eventos com faker
    await criarEventosDefault()
    while(true){
        // Pede credenciaos do usuario
        const email = await questionAsync("Email: ")
        const senha = await questionAsync("Senha: ")
        // Verifica se os dados correspondem ao banco de dados
        const usuario = await listarUsuariosEmail(email, senha)
        // Cria propriedade que era controlar um "AutoDelete"
        // Caso alguém que esteja logado decida deletar a si mesmo
        let apagarUserLogado:any = false
        // verifica o resultadao da pesquisa
        if(usuario != undefined || usuario !=null){
            console.log(`Seja Bem vindo ao sistema ${usuario.nome}`)
            const id = usuario.id
            while(true){
                console.log('')
                console.log("O que deseja fazer?")
                console.log("1 - Gerenciar Eventos")
                console.log("2 - Gerenciar Usuarios")
                console.log("3 - Sair")
                const choice = await questionAsync("> ")
                switch(choice){

                    case "1":
                        while(true){
                            console.log("O que deseja fazer?")
                            console.log("1 - Criar Evento")
                            console.log("2 - Deletar Evento")
                            console.log("3 - Alterar Evento")
                            console.log("4 - Listar Evento por id")
                            console.log("5 - Listar todos os Eventos")
                            console.log("6 - Gerar um Evento aleatório com Faker")
                            console.log("7 - Sair")
                            const choice1 = await questionAsync("> ")
                            switch(choice1){
                                case "1":
                                    console.log("")
                                    await criarEvento(id)
                                    console.log("")
                                    continue

                                case "2":
                                    console.log("")
                                    await excluirEvento(id)
                                    console.log("")
                                    continue

                                case "3":
                                    console.log("")
                                    await atualizarEvento(id)
                                    console.log("")
                                    continue

                                case "4":
                                    console.log("")
                                    await listarEvento()
                                    console.log("")
                                    continue

                                case "5":
                                    console.log("")
                                    await listarTodosEventos()
                                    console.log("")
                                    continue

                                case "6":
                                    console.log("")
                                    await gerarFakeEvento(id)
                                    console.log("")
                                    continue
                                case "7":
                                    console.log("Saindo do gerenciador de Eventos")
                                    console.log("")
                                    break
                                default:
                                    console.log("")
                                    console.log("Valor digitado não consta na lista de opções disponíveis")
                                    console.log("")
                                    continue
                            } break
                        }continue
                    case "2":
                        while(true){
                            console.log("O que deseja fazer?")
                            console.log("1 - Adicionar Usuário")
                            console.log("2 - Deletar Usuário")
                            console.log("3 - Alterar Usuário")
                            console.log("4 - Listar Usuário por id")
                            console.log("5 - Listar todos os usuarios")
                            console.log("6 - Gerar Usuário fake")
                            console.log("7 - Sair")
                            const choice2 = await questionAsync("> ")
                            switch(choice2){
                                case "1":
                                    console.log("")
                                    await criarUsuario(id)
                                    console.log("")
                                    continue

                                case "2":
                                    console.log("")
                                    apagarUserLogado = await excluirUsuario(id)
                                    console.log("")
                                    continue

                                case "3":
                                    console.log("")
                                    await atualizarUsuario(id)
                                    console.log("")
                                    continue

                                case "4":
                                    console.log("")
                                    await procurarUsuarioId()
                                    console.log("")
                                    continue

                                case "5":
                                    console.log("")
                                    await procurarUsuarios()
                                    console.log("")
                                    continue

                                case "6":
                                    console.log("")
                                    await gerarUsuarioFake(id)
                                    console.log("")
                                    continue

                                case "7":
                                    console.log("Saindo do gerenciador de Usuarios")
                                    console.log("")
                                    break
                                default:
                                    console.log("")
                                    console.log("Valor digitado não consta na lista de opções disponíveis")
                                    console.log("")
                                    continue
                            }break
                        }
                        continue

                    case "3":
                        console.log("Saindo do sistema...")
                        console.log("")
                        break
                    
                    default:
                        console.log("Valor digitado não consta na lista de opções disponíveis")
                        continue
                }break

            }
        } else {
            console.log("")
            console.log("Credênciais incorretos ou não constam no banco de dados.")
            console.log("")
            continue
        }
        // Caso true o usuario será deletado antes do sistema ser encerrado
        if(apagarUserLogado === true){
            await deletarUsuario(usuario.id)
            await escreverLogUsuario({
                "UUID": uuidv4(),
                "ID_USUARIO": usuario.id,
                "DATA": new Date(),
                "AÇÃO": acaoEnum.DELETAR
            })
        }
        // Fecha a comunicação com o terminal
        rl.close()
        break
    }

}

// Chama a função principal
main()