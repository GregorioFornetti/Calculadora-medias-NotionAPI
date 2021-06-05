
const MAX_NOTAS = 20

var modal_materia
var modal_token
var modal_JSON
document.addEventListener("DOMContentLoaded", () => {
    modal_materia = new bootstrap.Modal(document.getElementById('materia-modal'))
    modal_token = new bootstrap.Modal(document.getElementById('token-modal'))
    modal_JSON = new bootstrap.Modal(document.getElementById('json-materias-modal'))
})

// code from: https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/
function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
 }
 

function restaurar_modal_materia() {
    mostrar_inputs_notas(0, true)  // Limpar todos inputs de notas

    let modal_body = document.querySelector("#modal-body-materias")
    for (let i = 0; i < modal_body.children.length; i++) {
        if (modal_body.children[i].id != 'div-inputs-notas') {
            modal_body.children[i].children[0].value = ''  // Limpar conteúdo input
            modal_body.children[i].children[0].readOnly = false
            modal_body.children[i].children[2].innerHTML = ''  // Limpar campo de erro do input
        }
    }
}


function criar_inputs_notas() {
    let div_inputs_notas = document.querySelector("#div-inputs-notas")
    div_inputs_notas.innerHTML = ''

    for (let num_nota_atual = 1; num_nota_atual <= MAX_NOTAS; num_nota_atual++) {
        div_inputs_notas.append(retornar_input_nota(`Nome nota ${num_nota_atual}`, `nome-nota-${num_nota_atual}`))
        div_inputs_notas.append(retornar_input_nota(`Id nota ${num_nota_atual}`, `id-nota-${num_nota_atual}`))
    }
}

function mostrar_inputs_notas(qnt_notas, reset_value = false) {
    for (let num_nota_atual = 1; num_nota_atual <= MAX_NOTAS; num_nota_atual++) {
        let display_atual = (num_nota_atual > qnt_notas) ? ('none') : ('block')
        let input_nome_nota = document.querySelector(`#nome-nota-${num_nota_atual}`)
        let input_id_nota = document.querySelector(`#id-nota-${num_nota_atual}`)

        input_nome_nota.parentElement.style.display = display_atual
        input_id_nota.parentElement.style.display = display_atual

        if (reset_value) {
            input_nome_nota.value = ''
            input_id_nota.value = ''
        }
    }
}

function corrigir_e_adicionar_inputs_notas() {
    let input_qnt_notas = document.querySelector("#qnt-notas")
    input_qnt_notas.value = corrigir_input_qnt_notas(input_qnt_notas.value)
    let qnt_notas = parseInt(input_qnt_notas.value)

    if (!qnt_notas)
        qnt_notas = 0
    mostrar_inputs_notas(qnt_notas)
}

function corrigir_input_qnt_notas(valor_input) {
    if (!valor_input.match(/[^\d]/)) {
        if (parseInt(valor_input) < 0)
            return 0
        else if (parseInt(valor_input) > MAX_NOTAS)
            return MAX_NOTAS
        return valor_input
    } 
    return ''
}

function retornar_input_nota(label_input, id_input, input_value = '') {
    let container_final = document.createElement("div")
    
    let container_input = document.createElement("div")
    container_input.className = "form-floating mb-3"
    container_input.style.display = 'none'

    let input_nota = document.createElement("input")
    input_nota.type = 'text'
    input_nota.className = 'form-control'
    input_nota.id = id_input
    input_nota.placeholder = label_input
    input_nota.value = input_value

    let label_nota = document.createElement("label")
    label_nota.htmlFor = id_input
    label_nota.innerText = label_input

    let span_erro = document.createElement("span")
    span_erro.className = 'erro'
    span_erro.id = `erro-${id_input}`

    container_input.append(input_nota)
    container_input.append(label_nota)
    container_input.append(span_erro)

    container_final.append(container_input)

    return container_final
}


function verificar_input_vazio(node_input, node_erro) {
    if (node_input.value.length === 0) {
        node_erro.innerHTML = "Você precisa preencher esse campo"
        return 1
    }
    node_erro.innerHTML = ''
    return 0
}

function verificar_input_nome_materia(node_input, node_erro) {
    if (verificar_input_vazio(node_input, node_erro))
        return 1
    if (node_input.value === 'token') {
        node_erro.value = 'Nome de matéria inválido'
        return 1
    }
    return 0
}

function analisar_e_salvar_inputs_materia() {
    let qnt_erros = 0

    let input_nome_materia = document.querySelector("#nome-materia")
    let erro_nome_materia = document.querySelector("#erro-nome-materia")
    qnt_erros += verificar_input_nome_materia(input_nome_materia, erro_nome_materia)

    let input_id_materia = document.querySelector("#id-materia")
    let erro_id_materia = document.querySelector("#erro-id-materia")
    qnt_erros += verificar_input_vazio(input_id_materia, erro_id_materia)

    let input_qnt_notas = document.querySelector("#qnt-notas")
    let erro_qnt_notas = document.querySelector("#erro-qnt-notas")
    if (input_qnt_notas.value.length === 0 || parseInt(input_qnt_notas.value) === 0) {
        erro_qnt_notas.innerHTML = "Você precisa preencher esse campo"
        qnt_erros++
    } else {
        erro_qnt_notas.innerHTML = ''
    }


    let qnt_notas = parseInt(input_qnt_notas.value)
    if (qnt_notas) {
        var notas_e_ids = {}
        for (let num_nota_atual = 1; num_nota_atual <= qnt_notas; num_nota_atual++) {
            let qnt_erros_antiga = qnt_erros
            let input_nome_nota = document.querySelector(`#nome-nota-${num_nota_atual}`)
            let erro_nome_nota = document.querySelector(`#erro-nome-nota-${num_nota_atual}`)
            let input_id_nota = document.querySelector(`#id-nota-${num_nota_atual}`)
            let erro_id_nota = document.querySelector(`#erro-id-nota-${num_nota_atual}`)

            if (input_nome_nota.value.length === 0) {
                qnt_erros++
                erro_nome_nota.innerHTML = "Você precisa preencher esse campo"
            } else {
                let nome_ja_usado = false
                for (let nome_nota in notas_e_ids) {
                    if (notas_e_ids.hasOwnProperty(nome_nota) && nome_nota.toUpperCase() == input_nome_nota.value.toUpperCase()) {
                        nome_ja_usado = true
                        break
                    }
                }
                if (nome_ja_usado) {
                    qnt_erros++
                    erro_nome_nota.innerHTML = "Esse nome de nota já foi usado"
                } else {
                    erro_nome_nota.innerHTML = ''
                }
            }

            qnt_erros += verificar_input_vazio(input_id_nota, erro_id_nota)

            if (qnt_erros == qnt_erros_antiga)
                notas_e_ids[input_nome_nota.value] = input_id_nota.value
        }
    }

    let input_formula = document.querySelector("#formula-materia")
    let erro_formula = document.querySelector("#erro-formula-materia")
    if (input_formula.value.length === 0) {
        erro_formula.innerHTML = 'Você precisa preencher esse campo'
        qnt_erros++
    } else {
        let notas = {}
        var formula = ' ' + input_formula.value.replace(/\s/g, '') + ' '
        for (let nome_nota in notas_e_ids) {
            if (notas_e_ids.hasOwnProperty(nome_nota)) {
                let expressao = new RegExp(`(\\W)${nome_nota}(\\W)`, 'ig')
                formula = formula.replace(expressao, `$1notas['${nome_nota}']$2`)
                notas[nome_nota] = 1
            }
        }
        // Verifica se a formula fornecida é válida. Se a formula é inválida, ou ela retornará um NaN ou undefined ou acontecerá um erro, parando no catch.
        try {
            eval(formula) + 1
            erro_formula.innerHTML = ''
        } catch (error) {
            qnt_erros++
            erro_formula.innerHTML = 'Formula inválida'
        }
    }

    if (qnt_erros == 0) {
        let json_materia_atual = {'notas' : notas_e_ids,
                                  'id' : input_id_materia.value,
                                  'formula' : input_formula.value,
                                  'formulaFormatada' : formula}
        
        if (!localStorage.getItem(input_nome_materia.value)) {
            document.querySelector("#container-materias").append(retornar_btn_materia(input_nome_materia.value))
        }
        localStorage.setItem(input_nome_materia.value, JSON.stringify(json_materia_atual))
        restaurar_modal_materia()
        alert("A matéria foi salva com sucesso !")

        modal_materia.hide()
    }
}


function carregar_input_token() {
    let token = localStorage.getItem("token")
    if (token)
        document.querySelector("#token").value = token
}

function analisar_e_salvar_input_token() {
    let input_token = document.querySelector("#token")
    let erro_token = document.querySelector("#erro-token")

    if (!verificar_input_vazio(input_token, erro_token)) {
        // Input de token não é vazio, salvar token
        localStorage.setItem("token", input_token.value)
        alert("Token salvo com sucesso !")
        modal_token.hide()
    }
}

function restaurar_modal_token() {
    document.querySelector("#token").value = ''
    document.querySelector("#erro-token").innerHTML = ''
}


function adicionar_btns_materias() {
    let container_materias = document.querySelector("#container-materias")
    container_materias.innerHTML = ''
    for (let i = 0; i < localStorage.length; i++) {
        let nome_materia = localStorage.key(i)
        if (nome_materia != 'token') {
            container_materias.append(retornar_btn_materia(nome_materia))
        }
    }
}

function retornar_btn_materia(nome_materia) {
    let div_btn_materia = document.createElement("div")
    div_btn_materia.className = 'btn-group mb-3'
    
    let btn_materia = document.createElement("button")
    btn_materia.dataset.bsToggle = "modal"
    btn_materia.dataset.bsTarget = "#materia-modal"
    btn_materia.type = 'button'
    btn_materia.className = 'btn btn-primary w-75'
    btn_materia.innerHTML = nome_materia
    btn_materia.addEventListener('click', () => { carregar_inputs_materias(nome_materia) })

    let btn_excluir_materia = document.createElement("button")
    btn_excluir_materia.type = 'button'
    btn_excluir_materia.className = 'btn btn-danger'
    btn_excluir_materia.innerHTML = '<i class="bi bi-trash"></i>'
    btn_excluir_materia.addEventListener('click', () => { apagar_materia(nome_materia, div_btn_materia) })

    div_btn_materia.append(btn_materia)
    div_btn_materia.append(btn_excluir_materia)

    return div_btn_materia
}

function carregar_inputs_materias(nome_materia) {
    let dados_materia = JSON.parse(localStorage.getItem(nome_materia))

    let input_nome_materia = document.querySelector("#nome-materia")
    input_nome_materia.value = nome_materia
    input_nome_materia.readOnly = true

    let input_id_materia = document.querySelector("#id-materia")
    input_id_materia.value = dados_materia['id']

    let qnt_notas = Object.keys(dados_materia['notas']).length
    let input_qnt_notas = document.querySelector("#qnt-notas")
    input_qnt_notas.value = qnt_notas

    let num_nota_atual = 1
    mostrar_inputs_notas(qnt_notas)
    for (let nome_nota in dados_materia['notas'])
        if (dados_materia['notas'].hasOwnProperty(nome_nota)) {
            document.querySelector(`#nome-nota-${num_nota_atual}`).value = nome_nota
            document.querySelector(`#id-nota-${num_nota_atual}`).value = dados_materia['notas'][nome_nota]
            num_nota_atual++
        }

    let input_formula = document.querySelector("#formula-materia")
    input_formula.value = dados_materia['formula']
}

function apagar_materia(nome_materia, container_materia) {
    localStorage.removeItem(nome_materia)
    container_materia.remove()
}


function salvar_JSON_materia() {
    let input_json = document.querySelector("#input-json")
    let erro_json = document.querySelector("#erro-input-json")

    if (!verificar_input_vazio(input_json, erro_json)) {
        try {
            let novo_json = JSON.parse(input_json.value)
            console.log(novo_json)
            localStorage.clear()
            for (let dado in novo_json) {
                if (novo_json.hasOwnProperty(dado) && dado == 'token')
                    localStorage.setItem(dado, novo_json[dado])
                else
                    localStorage.setItem(dado, JSON.stringify(novo_json[dado]))
            }
            adicionar_btns_materias()
            modal_JSON.hide()
        } catch(error) {
            console.log(error)
        }
    }
}

function restaurar_modal_JSON() {
    document.querySelector("#input-json").value = ''
    document.querySelector("#erro-input-json").innerHTML = ''
}


function copiar_JSON_materias() {
    let json_final = {}
    for (let i = 0; i < localStorage.length; i++) {
        let chave_atual = localStorage.key(i)
        if (chave_atual == 'token')
            json_final[chave_atual] = localStorage[chave_atual]
        else
            json_final[chave_atual] = JSON.parse(localStorage.getItem(chave_atual))
    }
    copyStringToClipboard(JSON.stringify(json_final))
    alert("JSON matérias copiado com sucesso !")
}