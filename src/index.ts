import { criarTabelaUsuario } from "./services/EventoService";
import { criarTabelaEvento } from "./services/EventoService";
import { criarUsuariosDefault } from "./controllers/UsuarioControllers";
import { usuario1 } from "./seeds/UsuarioSeed";


async function main() {
    await criarTabelaUsuario()
    await criarTabelaEvento()
    await criarUsuariosDefault(usuario1)

}

main()