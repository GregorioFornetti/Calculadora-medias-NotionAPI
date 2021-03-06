
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


function criar_inputs_notas() {
    // Criará e colocará os inputs de notas (nome e id do banco de dados para tal média) no modal de matérias.
    let div_inputs_notas = document.querySelector("#div-inputs-notas")
    div_inputs_notas.innerHTML = ''

    for (let num_nota_atual = 1; num_nota_atual <= MAX_NOTAS; num_nota_atual++) {
        div_inputs_notas.append(retornar_input_nota(`Nome nota ${num_nota_atual}`, `nome-nota-${num_nota_atual}`))
        div_inputs_notas.append(retornar_input_nota(`Id nota ${num_nota_atual}`, `id-nota-${num_nota_atual}`))
    }
}

function retornar_input_nota(label_input, id_input) {
    // Retorna um container contendo um input de nota (com label, input e campo de erro).
    let container_final = document.createElement("div")
    
    let container_input = document.createElement("div")
    container_input.className = "form-floating mb-3"
    container_input.id = `container-${id_input}`
    container_input.style.display = 'none'

    let input_nota = document.createElement("input")
    input_nota.type = 'text'
    input_nota.className = 'form-control'
    input_nota.id = id_input
    input_nota.placeholder = label_input

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


function adicionar_btns_materias() {
    // Adiciona os botões matérias na pagina. São botões que permitem que o usuário possa editar as matérias que ele configurou.
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
    // Carregar todos campos do modal de matéria com os valores armazenados da matéria atual.
    let dados_materia = JSON.parse(localStorage.getItem(nome_materia))

    document.querySelector("#nome-materia").readOnly = true
    carregar_inputs_materias_comum({"nome-materia": nome_materia,
                                    "id-materia": dados_materia['id'],
                                    "qnt-notas": Object.keys(dados_materia['notas']).length,
                                    "formula-materia": dados_materia['formula']})
    document.querySelector("#nome-materia").readOnly = true

    carregar_inputs_notas(dados_materia['notas'])
}

function carregar_inputs_materias_comum(json_conversoes) {
    // Coloca os valores armazenados da matéria atual (sem ser os inputs de nota) no modal de matéria.
    for (let id_input in json_conversoes)
        if (json_conversoes.hasOwnProperty(id_input))
            document.getElementById(id_input).value = json_conversoes[id_input]
}

function carregar_inputs_notas(notas) {
    // Coloca os valores armazenados das notas nos campos de notas do modal de matéria.
    let num_nota_atual = 1
    mostrar_inputs_notas(Object.keys(notas).length)
    for (let nome_nota in notas)
        if (notas.hasOwnProperty(nome_nota)) {
            document.querySelector(`#nome-nota-${num_nota_atual}`).value = nome_nota
            document.querySelector(`#id-nota-${num_nota_atual}`).value = notas[nome_nota]
            num_nota_atual++
        }
}

function apagar_materia(nome_materia, container_materia) {
    localStorage.removeItem(nome_materia)
    container_materia.remove()
}


function restaurar_modal_materia() {
    // Irá fazer com que o modal de materias volte a ser como era no inicio da execução.
    mostrar_inputs_notas(0, true)  // Limpar todos inputs de notas (e esconde-los)

    let modal_body = document.querySelector("#modal-body-materias")
    for (let i = 0; i < modal_body.children.length; i++) {
        let container_atual = modal_body.children[i]
        limpar_input_materia(container_atual.querySelector('input'))
        apagar_msg_erro_input_materia(container_atual.querySelector('.erro'))
    }
}

function limpar_input_materia(input_materia) {
    if (input_materia) {
        input_materia.className = remover_classe_validacao(input_materia)
        input_materia.value = ''
        input_materia.readOnly = false
    }
}

function apagar_msg_erro_input_materia(label_erro) {
    if (label_erro)
        label_erro.innerHTML = ''
}


function retornar_valor_corrigido_input_qnt_notas(valor_input) {
    // O input de quantidade de notas deverá ser um número positivo e menor ou igual a "MAX_NOTAS".
    if (!valor_input.match(/[^\d]/)) {
        if (parseInt(valor_input) > MAX_NOTAS)
            return MAX_NOTAS
        else if (parseInt(valor_input) === 0)
            return 1
        return valor_input
    } 
    return ''
}

function mostrar_inputs_notas(qnt_notas, resetar = false) {
    /* Mostrará os inputs de notas (campo de nome e id de notas presente) dependendo do parametro qnt_notas.
       EX: se qnt_notas = 1, mostrará apenas os 2 primeiros campos de notas (nome nota 1 e id nota 1) */
    // Se resetar for verdadeiro, limpará o campo dos inputs (será aplicado quando fechar ou enviar o formulário).
    for (let num_nota_atual = 1; num_nota_atual <= MAX_NOTAS; num_nota_atual++) {
        let display_atual = (num_nota_atual > qnt_notas) ? ('none') : ('block')
        atualizar_input_nota(`container-nome-nota-${num_nota_atual}`, display_atual, resetar)
        atualizar_input_nota(`container-id-nota-${num_nota_atual}`, display_atual, resetar)
    }
}

function atualizar_input_nota(id_container_input, tipo_display, resetar) {
    // Define o pai do input (container do input) como visivel ou invisivel dependendo do argumento "tipo_display"
    let container_input = document.getElementById(id_container_input)
    container_input.style.display = tipo_display
    if (resetar) {
        let input_nota = container_input.querySelector('input')
        input_nota.value = ''
        input_nota.className = remover_classe_validacao(input_nota)
        container_input.querySelector('.erro').innerHTML = ''
    }
}


function analisar_e_salvar_inputs_materia() {
    // Analisará todos os inputs de materia e se tiver algum erro, mostrará uma mensagem de erro logo abaixo do input.
    // Se todos os inputs forem corretos, os dados serão salvos no localStorage.
    let qnt_erros = 0
    let input_id = document.querySelector("#id-materia")
    let input_nome_materia = document.querySelector("#nome-materia")
    let input_qnt_notas = document.querySelector("#qnt-notas")
    let json_materia = {"id": input_id.value.trim()}

    let nome_materia = input_nome_materia.value.trim()
    qnt_erros += verificar_input(input_nome_materia, document.querySelector("#erro-nome-materia"), ['token'])

    qnt_erros += verificar_input(input_id, document.querySelector("#erro-id-materia"))

    qnt_erros += verificar_input(input_qnt_notas, document.querySelector("#erro-qnt-notas"))

    qnt_erros += verificar_inputs_notas(parseInt(input_qnt_notas.value), json_materia)
    
    qnt_erros += verificar_input_formula(document.querySelector("#formula-materia"), document.querySelector("#erro-formula-materia"), json_materia)

    if (qnt_erros == 0)
        salvar_info_materia(nome_materia, json_materia)
}

function verificar_input(input, node_erro, lista_nomes_invalidos = []) {
    // Retorna 1 se o input for inválido (ocorreu um erro) e 0 se for válido.
    // Node erro é o elemento HTML que armazenará o texto de erro.
    // O input será valido se não for vazio e nem estar na lista de nomes invalidos.
    if (input.value.length === 0) {
        aplicar_erro_input(input, node_erro, "Você precisa preencher esse campo")
        return 1
    }
    if (lista_nomes_invalidos.includes(input.value)) {
        aplicar_erro_input(input, node_erro, 'Nome já utilizado')
        return 1
    }
    aplicar_acerto_input(input, node_erro)
    return 0
}

function verificar_inputs_notas(qnt_notas, json_materia) {
    // Verificará se os inputs de notas estão corretos. Retornará a quantidade de erros encontrados.
    let qnt_erros = 0
    if (qnt_notas) {
        json_materia['notas'] = {}
        for (let num_nota_atual = 1; num_nota_atual <= qnt_notas; num_nota_atual++) {
            let input_nome_nota = document.querySelector(`#nome-nota-${num_nota_atual}`)
            let input_id_nota = document.querySelector(`#id-nota-${num_nota_atual}`)

            qnt_erros += verificar_input(input_nome_nota, document.querySelector(`#erro-nome-nota-${num_nota_atual}`), Object.keys(json_materia['notas']))
            qnt_erros += verificar_input(input_id_nota, document.querySelector(`#erro-id-nota-${num_nota_atual}`))

            if (input_nome_nota.value.trim())
                json_materia['notas'][input_nome_nota.value.trim()] = input_id_nota.value.trim()
        }
    }
    return qnt_erros
}

function verificar_input_formula(input_formula, node_erro_formula, json_materia) {
    if (verificar_input(input_formula, node_erro_formula)) 
        return 1
    
    json_materia['formula'] = input_formula.value.trim()
    let notas = {}  // terá notas[nome_nota] = 1, para substituir na fórmula formatada para testar a validade.
    var formula = formatar_formula(json_materia, notas)
    // Verifica se a formula fornecida é válida. Substituirá todas as variáveis (se forem válidas) por 1 e executará a fórmula.
    try {
        let valor_teste = eval(formula)
        if (valor_teste && valor_teste != Infinity) {
            aplicar_acerto_input(input_formula, node_erro_formula)
            json_materia['formulaFormatada'] = formula
            return 0
        }
        aplicar_erro_input(input_formula, node_erro_formula, 'Formula inválida')
        return 1
    } catch(error) {
        aplicar_erro_input(input_formula, node_erro_formula, 'Formula inválida')
        return 1
    }
}

function formatar_formula(json_materia, notas) {
    // Trocará todos os nomes de notas da formula original por notas['nome_variavel'] (facilitará na hora de aplicar a formula).
    let formula = ' ' + json_materia['formula'].replace(/\s/g, '') + ' '
    for (let nome_nota in json_materia['notas']) {
        if (json_materia['notas'].hasOwnProperty(nome_nota)) {
            let expressao = new RegExp(`(\\W)${nome_nota}(\\W)`, 'ig')
            formula = formula.replace(expressao, `$1notas['${nome_nota}']$2`)
            notas[nome_nota] = 1
        }
    }
    return formula
}

function aplicar_erro_input(input, node_erro, mensagem_erro) {
    // Aplicará a classe de input inválido e colocará uma mensagem de erro abaixo input
    input.className = remover_classe_validacao(input) + ' is-invalid'
    node_erro.innerHTML = mensagem_erro
}

function aplicar_acerto_input(input, node_erro) {
    // Aplicará a classe de input válido e tirará o erro abaixo do input
    input.className = remover_classe_validacao(input) + ' is-valid'
    node_erro.innerHTML = ''
}

function remover_classe_validacao(input) {
    return input.className.replace(/ is-valid| is-invalid/, '')
}

function limpar(input, node_erro) {
    input.className = remover_classe_validacao(input)
    input.value = ''
    node_erro.innerHTML = ''
}

function salvar_info_materia(nome_materia, json_materia) {
    // Salvará os dados da matéria no localStorage e adicionará um botão para poder edita-la, caso a matéria ainda não existisse.
    if (!localStorage.getItem(nome_materia)) {
        document.querySelector("#container-materias").append(retornar_btn_materia(nome_materia))
    }
    localStorage.setItem(nome_materia, JSON.stringify(json_materia))
    restaurar_modal_materia()
    alert("A matéria foi salva com sucesso !")

    modal_materia.hide()
}


function carregar_input_token() {
    // Se já tiver um token armazenado, preecher o input de token com ele.
    let token = localStorage.getItem("token")
    if (token)
        document.querySelector("#token").value = token
}

function analisar_e_salvar_input_token() {
    let input_token = document.querySelector("#token")
    if (!verificar_input(input_token, document.querySelector("#erro-token"))) {
        // Input de token não é vazio, salvar token
        localStorage.setItem("token", input_token.value.trim())
        alert("Token salvo com sucesso !")
        restaurar_modal_token()
        modal_token.hide()
    }
}

function restaurar_modal_token() {
    // Faz com que o modal do token volte a ser como ele era no início da execução
    limpar(document.querySelector("#token"), document.querySelector("#erro-token"))
}


function salvar_JSON_materia() {
    // Caso o JSON digitado seja válido
    let input_json = document.querySelector("#input-json")

    if (!verificar_input(input_json, document.querySelector("#erro-input-json"))) {
        try {
            let novo_json = JSON.parse(input_json.value.trim())
            for (let dado in novo_json) {
                if (novo_json.hasOwnProperty(dado) && dado == 'token')
                    localStorage.setItem(dado, novo_json[dado])
                else
                    localStorage.setItem(dado, JSON.stringify(novo_json[dado]))
            }
            adicionar_btns_materias()
            modal_JSON.hide()
            restaurar_modal_JSON()
        } catch(error) {
            console.log(error)
            aplicar_erro_input(input_json, document.querySelector("#erro-input-json"), "JSON inválido")
        }
    }
}

function restaurar_modal_JSON() {
    // Faz com que o modal de configuração JSON volte a ser como ele era no início da execução.
    limpar(document.querySelector("#input-json"), document.querySelector("#erro-input-json"))
}


function copiar_JSON_materias() {
    // Coloca todos os valores armazenados no LocalStorage para um JSON e copia isso para o cliente.
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