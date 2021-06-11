
var ferramentas = require("./functions")
var opcao_escolhida

(async() => {
    ferramentas.inicializar_programa()
    while (true) {
        ferramentas.imprimir_opcoes()
        opcao_escolhida = ferramentas.ler_opcao()
        console.log()
        
        if (opcao_escolhida == '1') {
            ferramentas.configurar()
        } 
        else if (opcao_escolhida == '2') {
            ferramentas.imprimir_configs()
        }
        else if (opcao_escolhida == '3') {
            ferramentas.adicionar_materia()
        }
        else if (opcao_escolhida == '4') {
            await ferramentas.imprimir_e_atualizar_materias()
        }
        else if (opcao_escolhida == '5') {
            ferramentas.remover_materia()
        }
        else if (opcao_escolhida == '6') {
            console.log("Finalizando o programa...")
            break
        }
        else {
            console.log("Opção inválida !")
        }

        console.log()
    }
})()