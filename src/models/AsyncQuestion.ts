import * as readline from "readline"
// responsável pela comunicação com o terminal
export const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout
})
// torna a variavel acima assíncrona
export function questionAsync(query:any): Promise<any>{
    return new Promise((resolve) => {
        rl.question(query, (input:any) =>{
            //rl.close()
            resolve(input);
        });
    });
}