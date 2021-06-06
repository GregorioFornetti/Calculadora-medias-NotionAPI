// npm install prompt-sync
const fs = require('fs')
const prompt = require('prompt-sync')({sigint: true})
const { Client } = require('@notionhq/client')

module.exports = {
    imprimir_opcoes: () => {
        console.log("1 - Configurar")
        console.log("2 - Ver configurações")
        console.log("3 - Adicionar matéria")
        console.log("4 - Imprimir e atualizar médias")
        console.log("5 - Apagar matéria")
        console.log("6 - Finalizar programa")
    },

    ler_opcao: () => {
        return prompt("Escolha uma opção: ")
    },

    configurar: () => {
        let resposta = prompt("Digite o token de integração: ")

        try {
            var dados = JSON.parse(fs.readFileSync('./materias.json'))
        } catch(error) {
            var dados = {}
        }
        dados['token'] = resposta
        
        try {
            fs.writeFileSync('./materias.json', JSON.stringify(dados))
            console.log("Configurações salvas com sucesso !")
        } catch(error) {
            console.error(error)
        }
    },

    imprimir_configs: () => {
        try {
            let configs = fs.readFileSync("./materias.json", {encoding:'utf8'})
            configs = JSON.parse(configs)
            console.log("Configurações:")
            console.log(`Token: ${configs['token']}\n`)

            for (let materia in configs) {
                if (configs.hasOwnProperty(materia) && materia != "token") {
                    console.log(`Matéria: ${materia}`)
                    console.log(`Id banco de dados média: ${configs[materia]['id']}`)
                    console.log(`Formula: ${configs[materia]['formula']}`)
                    for (let nota in configs[materia]['notas'])
                        if (configs[materia]['notas'].hasOwnProperty(nota))
                            console.log(`Nota ${nota}: ${configs[materia]['notas'][nota]}`)
                    console.log()
                }
            }
        } catch (error) {
            console.error(error)
        }
    },

    adicionar_materia: () => {
        try {
            var materias = JSON.parse(fs.readFileSync("./materias.json", {encoding:'utf8'}))
        } catch (error) {
            var materias = {}
        }

        let nome_materia = prompt("Digite o nome da matéria: ")

        if (materias.hasOwnProperty(nome_materia)) {
            console.log("Matéria ja existente !")
            return
        }
        let id_db_medias = prompt("Digite o ID do banco de dados(tabela) para armazenar as médias: ")
        materias[nome_materia] = {"notas" : {}, "id": id_db_medias}

        let qnt_notas = false
        while (!qnt_notas || qnt_notas <= 0)
            qnt_notas = parseInt(prompt("Digite a quantidade de notas necessárias para computar a média: "))

        for (let i = 1; i <= qnt_notas; i++) {
            let nome_nota = prompt(`Digite o nome que será dado para a nota ${i}: `)
            if (materias[nome_materia]["notas"].hasOwnProperty(nome_nota)) {
                console.log("Nome de nota já utilizado ! Tente novamente !")
                i--
            }
            else {
                let id_database = prompt(`Digite o ID do banco de dados(tabela) que está armazenando a sua nota ${i}: `)
                materias[nome_materia]["notas"][nome_nota] = id_database
            }
        }

        let formula = prompt("Digite a formula que será usada no cálculo da média: ")
        materias[nome_materia]['formula'] = formula
        formula = ' ' + formula.replace(/\s/g, '') + ' '
        for (let nome_nota in materias[nome_materia]["notas"]) {
            if (materias[nome_materia]["notas"].hasOwnProperty(nome_nota)) {
                let expressao = new RegExp(`(\\W)${nome_nota}(\\W)`, 'ig')
                formula = formula.replace(expressao, `$1notas['${nome_nota}']$2`)
            }
        }
        materias[nome_materia]['formulaFormatada'] = formula.trim()

        try {
            fs.writeFileSync("./materias.json", JSON.stringify(materias))
            console.log("Matéria adicionada com sucesso !")
        } catch (error) {
            console.log(error)
        }
    },

    imprimir_e_atualizar_materias : () => {
        return imprimir_e_atualizar()
    },

    remover_materia : () => {
        try {
            var materias = JSON.parse(fs.readFileSync("./materias.json"))
        } catch (error) {
            console.log(error)
            return
        }

        var nome_materia = prompt("Digite o nome da matéria a ser removida: ")
        if (materias.hasOwnProperty(nome_materia))
            delete materias[nome_materia]
        else {
            console.log("Matéria não encontrada !")
            return
        }

        try {
            fs.writeFileSync("./materias.json", JSON.stringify(materias))
            console.log("Matéria removida com sucesso !")
        } catch (error) {
            console.log(error)
        }
    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

async function imprimir_e_atualizar() {
    try {
        var materias = JSON.parse(fs.readFileSync("./materias.json", {encoding: "utf-8"}))
    } catch(error) {
        var materias = {}
    }

    if (isEmpty(materias)) {
        console.log("Você precisa criar uma matéria antes de usar essa opção !\n")
        return
    }

    const notion = new Client({ auth: materias["token"] })
    for (materia in materias) {
        if (materias.hasOwnProperty(materia) && materia != 'token') {
            console.log(`Matéria: ${materia}`)
            let notas = {}
            let notasMelhorCaso = {}
            let notasPiorCaso = {}

            for (let nota in materias[materia]["notas"]) {
                if (materias[materia]["notas"].hasOwnProperty(nota)) {
                    try {
                        var response = await notion.databases.query({
                            database_id: materias[materia]["notas"][nota]
                        })
                        
                        notasPiorCaso[nota] = 0
                        notasMelhorCaso[nota] = 0
                        var qnt_notas = response["results"].length
                        for (let i = 0; i < qnt_notas; i++) {
                            if (response["results"][i]["properties"]["Nota"]["number"] >= 0) {
                                notasPiorCaso[nota] += response["results"][i]["properties"]["Nota"]["number"]
                                notasMelhorCaso[nota] += response["results"][i]["properties"]["Nota"]["number"]
                            } else
                                notasMelhorCaso[nota] += 10
                        }
                        notasPiorCaso[nota] /= qnt_notas
                        notasMelhorCaso[nota] /= qnt_notas

                        console.log(`${nota} (melhor caso): ${notasMelhorCaso[nota].toFixed(2)}`)
                        console.log(`${nota} (pior caso): ${notasPiorCaso[nota].toFixed(2)}`)
                    } catch (error) {
                        console.log(error)
                        console.error("Ocorreu um erro ao tentar acessar o banco de dados !\nVerifique as configurações !\n")
                        continue
                    }
                }
            }

            console.log(`Formula: ${materias[materia]['formula']}`)
            try {
                notas = notasPiorCaso
                var media_pior_caso = eval(materias[materia]['formulaFormatada'])
                notas = notasMelhorCaso
                var media_melhor_caso = eval(materias[materia]['formulaFormatada'])

                console.log(`Media (melhor caso): ${media_melhor_caso.toFixed(2)}`)
                console.log(`Media (pior caso): ${media_pior_caso.toFixed(2)}`)
            } catch(error) {
                console.log("Erro ao aplicar a fórmula !\n")
                continue
            }

            try {
                response = await notion.databases.query({
                    database_id: materias[materia]["id"]
                })

                var qnt_notas = response["results"].length
                for (let i = 0; i < qnt_notas; i++) {
                    const page_ID = response["results"][i]["id"]
                    var page_properties = {}

                    if (response["results"][i]["properties"]['Caso']["title"][0]['text']['content'].toUpperCase() == 'PIOR CASO') {
                        for (let nota in materias[materia]["notas"]) {
                            if (materias[materia]["notas"].hasOwnProperty(nota)) {
                                page_properties[nota] = parseFloat(notasPiorCaso[nota].toFixed(2))
                            }
                        }
                        page_properties["Media"] = parseFloat(media_pior_caso.toFixed(2))
                    }
                    else {
                        for (let nota in materias[materia]["notas"]) {
                            if (materias[materia]["notas"].hasOwnProperty(nota)) {
                                page_properties[nota] = parseFloat(notasMelhorCaso[nota].toFixed(2))
                            }
                        }
                        page_properties["Media"] = parseFloat(media_melhor_caso.toFixed(2))
                    }

                    let updateResponse = await notion.pages.update({
                        page_id: page_ID,
                        properties: page_properties
                    })
                }
            } catch(error) {
                console.log(error)
                console.log("Não foi possível salvar as médias no banco de dados !")
            }
            console.log("Médias salvas no banco de dados de médias !\n")
        }
    }
}